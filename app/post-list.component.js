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
var ngfor_array_fix_pipe_1 = require("./ngfor-array-fix.pipe");
var feed_1 = require("./entities/feed/feed");
var PostListComponent = (function () {
    function PostListComponent(newsService) {
        this.newsService = newsService;
        this.Feeds = feed_1.Feeds.feeds;
        this.feedType = 0 /* _680News */;
        this.feed = feed_1.Feeds.Get(0 /* _680News */);
        this.mode = 'Observable';
    }
    PostListComponent.prototype.ngOnInit = function () {
        this.getPosts();
    };
    PostListComponent.prototype.ngAfterViewInit = function () {
        //$(".feedSwitch").bootstrapSwitch();                   
    };
    PostListComponent.prototype.ngDoCheck = function () {
        if (this.feedType != this.feed.feedType) {
            console.log(this.feedType, this.feed.feedType);
            this.feed = feed_1.Feeds.Get(this.feedType);
            console.log("feedtype changed to:" + this.feed.name);
            this.getPosts();
        }
    };
    PostListComponent.prototype.getPosts = function () {
        var _this = this;
        console.log("Get posts called for feed " + this.feed.name);
        this.newsService.getPosts(this.feed)
            .subscribe(function (data) { _this.entries = data; }, function (error) { console.log(error); }, function () { return console.log('done'); });
    };
    Object.defineProperty(PostListComponent.prototype, "FeedName", {
        // TODO: Remove this when we're done
        get: function () { return this.feed.name; },
        enumerable: true,
        configurable: true
    });
    PostListComponent = __decorate([
        core_1.Component({
            selector: 'post-list',
            providers: [http_1.HTTP_PROVIDERS, news_service_1.NewsService],
            templateUrl: 'app/post-list.component.html',
            pipes: [ngfor_array_fix_pipe_1.ArrayFixPipe]
        }), 
        __metadata('design:paramtypes', [news_service_1.NewsService])
    ], PostListComponent);
    return PostListComponent;
}());
exports.PostListComponent = PostListComponent;
//# sourceMappingURL=post-list.component.js.map