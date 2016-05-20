"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Angular3 = (function () {
    function Angular3() {
        this.name = "blah";
        this.Names = ["a", "b", "c", "d"];
        console.info('Angular3 Component Mounted Successfully');
    }
    Angular3 = __decorate([
        core_1.Component({
            selector: 'angular-3'
        }),
        core_1.View({
            templateUrl: 'angular-3.html'
        })
    ], Angular3);
    return Angular3;
}());
exports.Angular3 = Angular3;
