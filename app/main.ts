import { bootstrap } from "@angular/platform-browser-dynamic";
import { ROUTER_DIRECTIVES,  provideRouter, RouterConfig   } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from "./app.component";
// import { NewsService} from './news.service';
//  import {APP_ROUTER_PROVIDERS} from "./app.routes";

import { enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
// Add the RxJS Observable operators we need in this app.
// import './rxjs-operators';

bootstrap(AppComponent, [
    // APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    Title,
    // NewsService
]);

bootstrap(AppComponent);
