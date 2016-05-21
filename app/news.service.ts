import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';
import { NewsItem } from './entities/feed/news';

@Injectable()
export class NewsService {
    private serviceUrl = "/feed/toJson?url=http://www.680news.com/feed/";
    // private serviceUrl = "/feed/google-news.js";
    constructor(private http: Http) {
        console.info('News Service Constructor initialized');
    }
    
    getPosts() : Observable<NewsItem[]> {
      return this.http.get(this.serviceUrl)
       .map(this.extractData)
      .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        //google news
        // return body.responseData.feed.entries || { };
        //cbc news
        return body.rss.channel.item || { };
        
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