import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';
import { NewsItem } from './entities/feed/newsitem';
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class NewsService {
   
    constructor(private http: Http) {
        console.info('News Service Constructor initialized');
    }

    getPosts() : Observable<NewsItem[]> {
        console.log('getPosts called:', Feeds.enabledFeeds);
        if (Feeds.enabledFeeds.length ==0) {
            return  new Observable<NewsItem[]>();
        }
        // let result: Observable<NewsItem[]>;
        
        let serviceUrls = Feeds.enabledFeeds.map(f=> f.serviceUrl);
        let result = Observable.forkJoin<NewsItem[]>(            
            serviceUrls.map(
                serviceUrl => this.http.get(serviceUrl)
                .map(this.extractData, this)
                .catch(this.handleError)               
        ))
        .map(t=> t.concat.apply([], t)); //flatten
           
        // console.log("Result:", result);
        return result;
    }
    
    private extractData(res: Response) : NewsItem {
        
        //TODO: Can make this strategy pattern
        
        let body = res.json();
        // console.log('extractData called on ' + this.feed.name);
        if (body.feedType == FeedType._680News || body.feedType == FeedType._680NewsLocal) {
            return body.rss.channel.item
            .map(function (item) {
                var img = (item && item.media_content && item.media_content.$) ? item.media_content.$.url : "/images/680-news.png";
                var result = new NewsItem(item.title, item.link, img, null, null, item.description, item.category, item.content_encoded, body.feedType);
                // console.dir(result);
                return result;
            }); 
        }
        else if (body.feedType == FeedType.GoogleNews) {
            return body.responseData.feed.entries
            .map(function (item) {
                var img = "/images/google-news.png";
                var result = new NewsItem(item.title, item.link, img, item.author, item.publishedDate, item.contentSnippet, item.categories, item.content, body.feedType);
                return result;
            });
        } 
        else if (body.feedType == FeedType.CBCNews) {
            return body.rss.channel.item
            .map(function (item) {
                var contentNoImages = item.description.replace(/<img[^>]*>/g,"");
                var imgRaw = item.description.substring(0, item.description.indexOf(contentNoImages));
                var img = $(imgRaw).attr('src');
                var result = new NewsItem(item.title, item.link, img, item.author, item.pubDate, contentNoImages, item.category, null, body.feedType);
                return result;
            });
        }
        throw new Error("Unhandled feed type");
        //cbc news
        
    }
    
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
  
}