import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';
import { NewsItem } from './entities/feed/newsitem';
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

@Injectable()
export class NewsService {
   
    private feed: Feed;
    
    // private serviceUrl = "/feed/google-news.js";
    constructor(private http: Http) {
        console.info('News Service Constructor initialized');
    }

    getPosts(feed: Feed) : Observable<NewsItem[]> {
        this.feed = feed;
        return this.http.get(feed.serviceUrl)
        .map(this.extractData, this)
        .catch(this.handleError);
    }
    
    private extractData(res: Response) : NewsItem {
        let body = res.json();
        // console.log('extractData called on ' + this.feed.name);
        if (this.feed.feedType == FeedType._680News) {
            return body.rss.channel.item
            .map(function (item) {
                var result = new NewsItem(item.title, item.link, null, null, null, item.description, item.category, item.content_encoded);
                // console.dir(result);
                return result;
            }); 
        }
        else if (this.feed.feedType == FeedType.GoogleNews) {
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