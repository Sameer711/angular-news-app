"use strict";
///<reference path="../typings/browser.d.ts"/> 
///<reference path="./../typings/browser/ambient/es6-shim/index.d.ts"/>
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var app_component_1 = require("./app.component");
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var platform_browser_1 = require('@angular/platform-browser');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    platform_browser_1.Title
]);
//# sourceMappingURL=main.js.map