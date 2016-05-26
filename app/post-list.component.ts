import {Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewsService} from './news.service';
import { NewsItem } from "./entities/feed/newsitem";
import { ArrayFixPipe } from "./ngfor-array-fix.pipe";
import {Feed, Feeds, FeedType} from "./entities/feed/feed";

@Component({
    selector: 'post-list',  
    providers: [ HTTP_PROVIDERS, NewsService ],
    templateUrl: 'app/post-list.component.html',
    pipes: [ArrayFixPipe]
})

export class PostListComponent implements OnInit, AfterViewInit, DoCheck {
   ngOnInit() { 
       this.getPosts(); 
    }

   ngAfterViewInit() {
           //$(".feedSwitch").bootstrapSwitch();                   
   }
   
   ngDoCheck() {
       
       if (this.feedsChanged()) {
           console.log('feeds changed!');
        //    console.log(this.feedType, this.feed.feedType);
           this.feeds = Feeds.Get(this.selectedFeedTypes);
        //    console.log("feedtype changed to:" + this.feed.name);
           this.getPosts();
       }
   }
   
   private feedsChanged() : boolean {
       return this.feeds.every(feed=> this.selectedFeedTypes.findIndex(f=>f == feed.feedType)>-1);
   }

  public AllFeeds = Feeds.feeds; //just for binding to UI
  
  //readwrite access
  public selectedFeedTypes = [FeedType._680News];
  
  private feeds = Feeds.Get([FeedType._680News]);
  //feedTypeString = Util.FeedTypeToString(feedType);
  errorMessage: string;
  mode = 'Observable'; 
  entries: NewsItem[];
  
  constructor(private newsService: NewsService) {}
  getPosts() {
      if (this.feeds.length ==0) {
        this.entries = [];          
        return;
      }
        
    //   console.log("Get posts called for feed " + this.feed.name);
      this.newsService.getPosts(this.feeds)
        .subscribe(
            data => { this.entries = data },
            error => { console.log(error) } ,
            () => console.log('done')
       );            
  }
  
  get FeedNames() { return this.feeds.join(","); }
  
}