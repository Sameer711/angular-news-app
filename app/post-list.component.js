"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var news_service_1 = require('./news.service');
var derp_pipe_1 = require("./derp.pipe");
var PostListComponent = (function () {
    function PostListComponent(newsService) {
        this.newsService = newsService;
        this.mode = 'Observable';
    }
    PostListComponent.prototype.ngOnInit = function () { this.getPosts(); };
    PostListComponent.prototype.getPosts = function () {
        var _this = this;
        this.newsService.getPosts()
            .subscribe(function (data) { _this.entries = data; }, function (error) { console.log(error); }, function () { return console.log('done'); });
    };
    PostListComponent = __decorate([
        core_1.Component({
            selector: 'post-list',
            providers: [http_1.HTTP_PROVIDERS, news_service_1.NewsService],
            templateUrl: 'post-list.component.html',
            pipes: [derp_pipe_1.DerpPipe]
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService])
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
//# sourceMappingURL=post-list.component.js.map