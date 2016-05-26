 export const enum FeedType {
      _680News,
      GoogleNews,
      CBCNews
  }

export class Feed {
    name: string;
    serviceUrl: string;
    feedType: FeedType;
    isEnabled: boolean;
    constructor(name: string, serviceUrl:string, feedType: FeedType, isEnabled: boolean) {
        this.name = name;
        this.serviceUrl = serviceUrl;
        this.feedType = feedType;
        this.isEnabled = isEnabled;
    }
}

export class Feeds {
    
    static feeds = [
        new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/metrolinx/local/", FeedType._680News, true),
        new Feed("Google News", "/feed/google-news", FeedType.GoogleNews, false),
        new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", FeedType.CBCNews, false)
    ];
    
    // constructor() {
    //     Feeds.feeds.push(new Feed("680 News", "/feed/toJson?url=http://www.680news.com/feed/", FeedType._680News));
    //     Feeds.feeds.push(new Feed("Google News", "/feed/google-news", FeedType.GoogleNews));
    //     Feeds.feeds.push(new Feed("CBC News", "/feed/toJson?url=http://www.cbc.ca/cmlink/rss-topstories", FeedType.CBCNews));
    // }    
    
    static Get(filterList: FeedType[]) : Feed[] {
        return Feeds.feeds.filter(feed=> filterList.findIndex(f=>f == feed.feedType) > 0);
    }
          
} 