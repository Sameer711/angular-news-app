import {Component} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NewsService} from './news.service';

@Component({
    selector: 'my-app',  
    providers: [ HTTP_PROVIDERS ],
    templateUrl: 'app/angular-3.html'
})

export class AppComponent {
name = "blah";
  Names = ["a", "b", "c", "d"];
  constructor() {
    console.info('Angular3 Component Mounted Successfully');
  }
}