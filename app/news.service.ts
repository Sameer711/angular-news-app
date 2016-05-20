import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Post } from './post';

@Injectable()
export class NewsService {
   url: "http://jsonplaceholder.typicode.com/comments"
    constructor(private http: Http) {}
    
    getNews() : Observable<Post[]> {
      return this.http.get(this.url)
      .map(this.extractData)
      ;
      
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
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