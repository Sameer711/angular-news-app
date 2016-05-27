import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';
import { NewsItem } from './entities/feed/newsitem';
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

 import 'rxjs/Rx';
// import './rxjs-operators';
// import 'rxjs/add/operator/from';
// import 'rxjs/observer';
// import 'rxjs/add/operator/forkJoin';


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
             
        // Feeds.enabledFeeds.forEach(feed => {
        //     console.log("Calling httpget for " ,feed.serviceUrl);
        //     var thisCall = this.http.get(feed.serviceUrl)
        //         .map(this.extractData, this)
        //         // .take(3)
        //         .catch(this.handleError);
        //     // console.log('merging result', result, thisCall);
        //     if (typeof(result) == "undefined" || result == null) {
        //       console.log("initial call..");
        //       result = thisCall;
        //     }
        //     else {
        //         console.log("merging..");
        //         result.merge(thisCall);
        //     }
        // });
        //get each of the results and join them.
        // var result = this.http.get(Feeds.enabledFeeds[0].serviceUrl)
        // .map(this.extractData, this)
        // .catch(this.handleError);
        console.log("Result:", result);
        return result;
    }
    
    private extractData(res: Response) : NewsItem {
        let body = res.json();
        // console.log('extractData called on ' + this.feed.name);
        if (body.feedType == FeedType._680News || body.feedType == FeedType._680NewsLocal) {
            return body.rss.channel.item
            .map(function (item) {
                var img = (item && item.media_content && item.media_content.$) ? item.media_content.$.url : null;
                var result = new NewsItem(item.title, item.link, img, null, null, item.description, item.category, item.content_encoded, body.feedType);
                // console.dir(result);
                return result;
            }); 
        }
        else if (body.feedType == FeedType.GoogleNews) {
            return body.responseData.feed.entries
            .map(function (item) {
                var result = new NewsItem(item.title, item.link, null, item.author, item.publishedDate, item.contentSnippet, item.categories, item.content, body.feedType);
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