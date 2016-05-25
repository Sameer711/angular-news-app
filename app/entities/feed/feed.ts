 export const enum FeedType {
      _680News,
      GoogleNews,
      CBCNews
  }

export class Feed {
    name: string;
    serviceUrl: string;
    feedType: FeedType;
    constructor(name: string, serviceUrl:string, feedType: FeedType) {
        this.name = name;
        this.serviceUrl = serviceUrl;
        this.feedType = feedType;
    }
}

export class Feeds {
    
    static feeds = [
        new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/metrolinx/local/", FeedType._680News),
        new Feed("Google News", "/feed/google-news", FeedType.GoogleNews),
        new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", FeedType.CBCNews)
    ];
    
    // constructor() {
    //     Feeds.feeds.push(new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/", FeedType._680News));
    //     Feeds.feeds.push(new Feed("Google News", "/feed/google-news", FeedType.GoogleNews));
    //     Feeds.feeds.push(new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", FeedType.CBCNews));
    // }    
    
    static Get(feedType: FeedType) : Feed {
        return Feeds.feeds.find(feed=>feed.feedType == feedType);
    }
          
} 