import {Component, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewsService} from './news.service';
import { NewsItem } from "./entities/feed/news";
import { DerpPipe } from "./derp.pipe";

@Component({
    selector: 'post-list',  
    providers: [ HTTP_PROVIDERS, NewsService ],
    templateUrl: 'post-list.component.html',
    pipes: [DerpPipe]
})

export class PostListComponent implements OnInit {
   ngOnInit() { this.getPosts(); }
  
  errorMessage: string;
  mode = 'Observable'; 
  entries: NewsItem[];
  constructor(private newsService: NewsService) {}
  getPosts() {
      this.newsService.getPosts()
        .subscribe(
            data => { this.entries = data },
            error => { console.log(error) } ,
            () => console.log('done')
       );            
  }
}