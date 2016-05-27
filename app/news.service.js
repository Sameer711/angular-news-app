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
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var newsitem_1 = require('./entities/feed/newsitem');
var feed_1 = require("./entities/feed/feed");
require('rxjs/Rx');
// import './rxjs-operators';
// import 'rxjs/add/operator/from';
// import 'rxjs/observer';
// import 'rxjs/add/operator/forkJoin';
var NewsService = (function () {
    function NewsService(http) {
        this.http = http;
        console.info('News Service Constructor initialized');
    }
    NewsService.prototype.getPosts = function () {
        var _this = this;
        console.log('getPosts called:', feed_1.Feeds.enabledFeeds);
        if (feed_1.Feeds.enabledFeeds.length == 0) {
            return new Observable_1.Observable();
        }
        // let result: Observable<NewsItem[]>;
        var serviceUrls = feed_1.Feeds.enabledFeeds.map(function (f) { return f.serviceUrl; });
        var result = Observable_1.Observable.forkJoin(serviceUrls.map(function (serviceUrl) { return _this.http.get(serviceUrl)
            .map(_this.extractData, _this)
            .catch(_this.handleError); }))
            .map(function (t) { return t.concat.apply([], t); }); //flatten
        // console.log("Result:", result);
        return result;
    };
    NewsService.prototype.extractData = function (res) {
        //TODO: Can make this strategy pattern
        var body = res.json();
        // console.log('extractData called on ' + this.feed.name);
        if (body.feedType == 1 /* _680News */ || body.feedType == 0 /* _680NewsLocal */) {
            return body.rss.channel.item
                .map(function (item) {
                var img = (item && item.media_content && item.media_content.$) ? item.media_content.$.url : "/images/680-news.png";
                var result = new newsitem_1.NewsItem(item.title, item.link, img, null, null, item.description, item.category, item.content_encoded, body.feedType);
                // console.dir(result);
                return result;
            });
        }
        else if (body.feedType == 2 /* GoogleNews */) {
            return body.responseData.feed.entries
                .map(function (item) {
                var img = "/images/google-news.png";
                var result = new newsitem_1.NewsItem(item.title, item.link, img, item.author, item.publishedDate, item.contentSnippet, item.categories, item.content, body.feedType);
                return result;
            });
        }
        else if (body.feedType == 3 /* CBCNews */) {
            return body.rss.channel.item
                .map(function (item) {
                var contentNoImages = item.description.replace(/<img[^>]*>/g, "");
                var imgRaw = item.description.substring(0, item.description.indexOf(contentNoImages));
                var img = $(imgRaw).attr('src');
                var result = new newsitem_1.NewsItem(item.title, item.link, img, item.author, item.pubDate, contentNoImages, item.category, null, body.feedType);
                return result;
            });
        }
        throw new Error("Unhandled feed type");
        //cbc news
    };
    NewsService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    NewsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map