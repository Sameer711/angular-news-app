import { bootstrap } from "@angular/platform-browser-dynamic";
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from "./app.component";
// import { NewsService} from './news.service';
 
import { enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    Title,
    // NewsService
]);
