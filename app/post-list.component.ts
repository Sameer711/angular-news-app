import {Component, OnInit, DoCheck} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewsService} from './news.service';
import { NewsItem } from "./entities/feed/news";
import { DerpPipe } from "./derp.pipe";
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

@Component({
    selector: 'post-list',  
    providers: [ HTTP_PROVIDERS, NewsService ],
    templateUrl: 'app/post-list.component.html',
    pipes: [DerpPipe]
})

export class PostListComponent implements OnInit, DoCheck {
   ngOnInit() { this.getPosts(); }

   ngDoCheck() {
       
       if (this.feedType != this.feed.feedType) {
           console.log(this.feedType, this.feed.feedType);
           this.feed = Feeds.Get(this.feedType);
           console.log("feedtype changed to:" + this.feed.name);
           this.getPosts();
       }
   }

  feedType = FeedType._680News;
  private feed = Feeds.Get(FeedType._680News);
  //feedTypeString = Util.FeedTypeToString(feedType);
  errorMessage: string;
  mode = 'Observable'; 
  entries: NewsItem[];
  
  constructor(private newsService: NewsService) {}
  getPosts() {
      console.log("Get posts called for feed " + this.feed.name);
      this.newsService.getPosts(this.feed)
        .subscribe(
            data => { this.entries = data },
            error => { console.log(error) } ,
            () => console.log('done')
       );            
  }
  
    // TODO: Remove this when we're done
  get FeedName() { return this.feed.name; }
  
}