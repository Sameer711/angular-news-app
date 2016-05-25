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
var NewsService = (function () {
    // private serviceUrl = "/feed/google-news.js";
    function NewsService(http) {
        this.http = http;
        console.info('News Service Constructor initialized');
    }
    NewsService.prototype.getPosts = function (feed) {
        this.feed = feed;
        return this.http.get(feed.serviceUrl)
            .map(this.extractData, this)
            .catch(this.handleError);
    };
    NewsService.prototype.extractData = function (res) {
        var body = res.json();
        // console.log('extractData called on ' + this.feed.name);
        if (this.feed.feedType == 0 /* _680News */) {
            return body.rss.channel.item
                .map(function (item) {
                var img = (item && item.media_content && item.media_content.$) ? item.media_content.$.url : null;
                var result = new newsitem_1.NewsItem(item.title, item.link, img, null, null, item.description, item.category, item.content_encoded);
                // console.dir(result);
                return result;
            });
        }
        else if (this.feed.feedType == 1 /* GoogleNews */) {
            return body.responseData.feed.entries
                .map(function (item) {
                return new newsitem_1.NewsItem(item.title, item.link, null, item.author, item.publishedDate, item.contentSnippet, item.categories, item.content);
            });
        }
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