"use strict";
var Feed = (function () {
    function Feed(name, serviceUrl, feedType) {
        this.name = name;
        this.serviceUrl = serviceUrl;
        this.feedType = feedType;
    }
    return Feed;
}());
exports.Feed = Feed;
var Feeds = (function () {
    function Feeds() {
    }
    // constructor() {
    //     Feeds.feeds.push(new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/", FeedType._680News));
    //     Feeds.feeds.push(new Feed("Google News", "/feed/google-news", FeedType.GoogleNews));
    //     Feeds.feeds.push(new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", FeedType.CBCNews));
    // }    
    Feeds.Get = function (feedType) {
        return Feeds.feeds.find(function (feed) { return feed.feedType == feedType; });
    };
    Feeds.feeds = [
        new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/", 0 /* _680News */),
        new Feed("Google News", "/feed/google-news", 1 /* GoogleNews */),
        new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", 2 /* CBCNews */)
    ];
    return Feeds;
}());
exports.Feeds = Feeds;
//# sourceMappingURL=feed.js.map