import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Entry } from './entities';

@Injectable()
export class NewsService {
    private serviceUrl = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss";
    // private serviceUrl = "/feed/google-news.js";
    constructor(private http: Http) {
        console.info('News Service Constructor initialized');
    }
    
    getPosts() : Observable<Entry[]> {
      return this.http.get(this.serviceUrl)
       .map(this.extractData)
      .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.responseData.feed.entries || { };
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