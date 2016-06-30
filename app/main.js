"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require('@angular/http');
var app_component_1 = require("./app.component");
var platform_browser_1 = require('@angular/platform-browser');
// Add the RxJS Observable operators we need in this app.
// import './rxjs-operators';
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    // APP_ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    platform_browser_1.Title,
]);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent);
//# sourceMappingURL=main.js.map