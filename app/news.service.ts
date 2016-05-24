import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';
import { NewsItem } from './entities/feed/news';
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

@Injectable()
export class NewsService {
    // private serviceUrls = [
    //     "/feed/toJson?url=http://www.680news.com/feed/",
    //     "/feed/google-news",
    //     "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories"
    // ];
    
    // private serviceUrl = "/feed/google-news.js";
    constructor(private http: Http) {
        console.info('News Service Constructor initialized');
        //asdsa        
    }
    
    // getServiceUrl(feedType: FeedType): string {
    //     switch (feedType) {
    //         case FeedType._680News:
    //             return this.serviceUrls[0];
    //         case FeedType.CBCNews:
    //             return this.serviceUrls[1];
    //         case FeedType.CBCNews:
    //             return this.serviceUrls[2];
    //     }
    // }
    
    getPosts(feed: Feed) : Observable<NewsItem[]> {
      if (feed.feedType == FeedType._680News) {
        return this.http.get(feed.serviceUrl)
        .map((res) => res.json().rss.channel.item || { })
        .catch(this.handleError);
      }
      else if (feed.feedType == FeedType.GoogleNews) {
        return this.http.get(feed.serviceUrl)
        .map((res) => res.json().responseData.feed.entries || { })
        .catch(this.handleError);
      }
    }
    
    // private extractData(res: Response) {
    //     let body = res.json();
    //     //google news
        
    //     // return res.json().responseData.feed.entries || { };
    //     //cbc news
    //     return res.json().rss.channel.item || { };
        
    // }
    
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
  
}