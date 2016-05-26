import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';
import { NewsItem } from './entities/feed/newsitem';
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

import 'rxjs/Rx';
import 'rxjs/observable/merge';
import 'rxjs/observer';
import 'rxjs/operator/merge';


@Injectable()
export class NewsService {
   
    private feeds: Feed[];
    
    // private serviceUrl = "/feed/google-news.js";
    constructor(private http: Http) {
        console.info('News Service Constructor initialized');
    }

    getPosts(feeds: Feed[]) : Observable<NewsItem[]> {
        console.log('getPosts called:', feeds);
        this.feeds = feeds;
        if (this.feeds.length ==0) {
            return  new Observable<NewsItem[]>();
        }
        let result = new Observable<NewsItem[]>();
        this.feeds.forEach(feed => {
            result.merge(this.http.get(feed.serviceUrl)
                .map(this.extractData, this)
                .catch(this.handleError));
        });
        //get each of the results and join them.
        // return this.http.get(feed.serviceUrl)
        // .map(this.extractData, this)
        // .catch(this.handleError);
        return result;
    }
    
    private extractData(res: Response) : NewsItem {
        let body = res.json();
        // console.log('extractData called on ' + this.feed.name);
        if (body.feedType == FeedType._680News) {
            return body.rss.channel.item
            .map(function (item) {
                var img = (item && item.media_content && item.media_content.$) ? item.media_content.$.url : null;
                var result = new NewsItem(item.title, item.link, img, null, null, item.description, item.category, item.content_encoded);
                // console.dir(result);
                return result;
            }); 
        }
        else if (body.feedType == FeedType.GoogleNews) {
            return body.responseData.feed.entries
            .map(function (item) {
                return new NewsItem(item.title, item.link, null, item.author, item.publishedDate, item.contentSnippet, item.categories, item.content);
            });
        } 
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