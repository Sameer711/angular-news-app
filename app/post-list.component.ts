import {Component, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewsService} from './news.service';
import { Post } from "./post";

@Component({
    selector: 'post-list',  
    providers: [ HTTP_PROVIDERS, NewsService ],
    templateUrl: 'app/post-list.component.html'
})

export class PostListComponent implements OnInit {
   ngOnInit() { this.getPosts(); }
  
  errorMessage: string;
  mode = 'Observable'; 
  posts: Post[];
  constructor(private newsService: NewsService) {}
  getPosts() {
      this.newsService.getPosts()
        .subscribe(
            data => { this.posts = data },
            error => { console.log(error) } ,
            () => console.log('done')
       );            
  }
}