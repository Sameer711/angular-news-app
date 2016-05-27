"use strict";
var Feed = (function () {
    function Feed(name, serviceUrl, feedType, isEnabled) {
        this.name = name;
        this.serviceUrl = serviceUrl;
        this.feedType = feedType;
        this.isEnabled = isEnabled;
    }
    return Feed;
}());
exports.Feed = Feed;
var Feeds = (function () {
    function Feeds() {
    }
    Object.defineProperty(Feeds, "enabledFeeds", {
        get: function () {
            return Feeds.feeds.filter(function (feed) { return feed.isEnabled; });
        },
        enumerable: true,
        configurable: true
    });
    Feeds.Get = function (filterList) {
        return Feeds.feeds.filter(function (feed) { return filterList.findIndex(function (f) { return f == feed.feedType; }) > -1; });
    };
    Feeds.feeds = [
        new Feed("680 News Local (with images)", "/feed/toJson?feedType=" + 0 /* _680NewsLocal */ + "&url=http://www.680news.com/feed/metrolinx/local/", 0 /* _680NewsLocal */, false),
        new Feed("680 News All", "/feed/toJson?feedType=" + 1 /* _680News */ + "&url=http://www.680news.com/feed/", 1 /* _680News */, false),
        new Feed("Google News", "/feed/google-news", 2 /* GoogleNews */, true),
        new Feed("CBC News", "/feed/toJson?feedType=" + 3 /* CBCNews */ + "&url=http://www.cbc.ca/cmlink/rss-topstories", 3 /* CBCNews */, false)
    ];
    return Feeds;
}());
exports.Feeds = Feeds;
//# sourceMappingURL=feed.js.map