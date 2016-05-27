import {Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewsService} from './news.service';
import { NewsItem } from "./entities/feed/newsitem";
import { ArrayFixPipe } from "./ngfor-array-fix.pipe";
import {Feed, Feeds, FeedType} from "./entities/feed/feed";
import "./Array.equals";

@Component({
    selector: 'post-list',  
    providers: [ HTTP_PROVIDERS, NewsService ],
    templateUrl: 'app/post-list.component.html',
    pipes: [ArrayFixPipe]
})

export class PostListComponent implements OnInit, AfterViewInit {
   ngOnInit() { 
       this.getPosts(); 
    }

   ngAfterViewInit() {
        //    $(".feedSwitch").bootstrapSwitch();                   
   }
   
   ngDoCheck() {
       
    //   this.dirtyCheckAndUpdate(null);
   }
   
   private feedSelected(feed: Feed, isChecked: boolean) {
       feed.isEnabled = isChecked;
       this.dirtyCheckAndUpdate();
   }
      
   private dirtyCheckAndUpdate() : void {
        if (this.feedsChanged()) {
           this.entries = [];
           console.log('feeds changed!');
        //    console.log(this.feedType, this.feed.feedType);
           this.oldFeeds = Feeds.enabledFeeds;
            console.log("feedtype changed to:" + this.FeedNames);
           this.getPosts();
           
       }
   }
   private feedsChanged() : boolean {
       var enabledFeeds = Feeds.enabledFeeds;
       var result = !this.oldFeeds.equals(enabledFeeds);
       console.log("oldfeeds", this.oldFeeds, "enabledFeeds:",enabledFeeds,"feeds changed:", result);
       return result;
   }

  public AllFeeds = Feeds.feeds; //just for binding to UI need a local instance.
  private oldFeeds = Feeds.enabledFeeds;  
  //feedTypeString = Util.FeedTypeToString(feedType);
  errorMessage: string;
  mode = 'Observable'; 
  entries: NewsItem[];
  
  constructor(private newsService: NewsService) {}
  getPosts() {
      if (Feeds.enabledFeeds.length ==0) {
        console.warn('No feeds enabled');
        this.entries = [];          
        return;
      }
        
    //   console.log("Get posts called for feed " + this.feed.name);
      this.newsService.getPosts()
        .subscribe(
            data => {
                console.log("newsService data=",data); 
                this.entries = data;
            },
            error => { console.log(error) } ,
            () => console.log('news service call done')
       );            
  }
  
  get FeedNames() : string { return Feeds.enabledFeeds.map(f=>f.name).join(" & "); }
  
}