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
require("./Array.equals");
var PostListComponent = (function () {
    function PostListComponent(newsService) {
        this.newsService = newsService;
        this.AllFeeds = feed_1.Feeds.feeds; //just for binding to UI need a local instance.
        this.oldFeeds = feed_1.Feeds.enabledFeeds;
        this.mode = 'Observable';
    }
    PostListComponent.prototype.ngOnInit = function () {
        this.getPosts();
    };
    PostListComponent.prototype.ngAfterViewInit = function () {
        //    $(".feedSwitch").bootstrapSwitch();                   
    };
    PostListComponent.prototype.ngDoCheck = function () {
        //   this.dirtyCheckAndUpdate(null);
    };
    PostListComponent.prototype.feedSelected = function (feed, isChecked) {
        feed.isEnabled = isChecked;
        this.dirtyCheckAndUpdate();
    };
    PostListComponent.prototype.dirtyCheckAndUpdate = function () {
        if (this.feedsChanged()) {
            this.entries = [];
            console.log('feeds changed!');
            //    console.log(this.feedType, this.feed.feedType);
            this.oldFeeds = feed_1.Feeds.enabledFeeds;
            console.log("feedtype changed to:" + this.FeedNames);
            this.getPosts();
        }
    };
    PostListComponent.prototype.feedsChanged = function () {
        var enabledFeeds = feed_1.Feeds.enabledFeeds;
        var result = !this.oldFeeds.equals(enabledFeeds);
        console.log("oldfeeds", this.oldFeeds, "enabledFeeds:", enabledFeeds, "feeds changed:", result);
        return result;
    };
    PostListComponent.prototype.getPosts = function () {
        var _this = this;
        if (feed_1.Feeds.enabledFeeds.length == 0) {
            console.warn('No feeds enabled');
            this.entries = [];
            return;
        }
        //   console.log("Get posts called for feed " + this.feed.name);
        this.newsService.getPosts()
            .subscribe(function (data) {
            console.log("newsService data=", data);
            _this.entries = data;
        }, function (error) { console.log(error); }, function () { return console.log('news service call done'); });
    };
    Object.defineProperty(PostListComponent.prototype, "FeedNames", {
        get: function () { return feed_1.Feeds.enabledFeeds.map(function (f) { return f.name; }).join(" & "); },
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