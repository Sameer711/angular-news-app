"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var angular_3_1 = require('angular-3');
var http_1 = require('@angular/http');
var Main = (function () {
    function Main() {
    }
    Main = __decorate([
        core_1.Component({
            selector: 'main'
        }),
        core_1.View({
            directives: [angular_3_1.Angular3],
            template: "\n    <angular-3></angular-3>\n  ",
            providers: [http_1.HTTP_PROVIDERS]
        })
    ], Main);
    return Main;
}());
browser_1.bootstrap(Main);
