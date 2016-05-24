import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
// import { Post } from "./post";
import { PostListComponent } from "./post-list.component";

@Component({
    selector: 'my-app',  
    providers: [ HTTP_PROVIDERS ],
    templateUrl: 'app/app.component.html',
    directives: [PostListComponent]
})

export class AppComponent {
  constructor() {
    console.info('AppComponent Mounted Successfully');
  }
}