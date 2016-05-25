"use strict";
var NewsItem = (function () {
    function NewsItem(title, link, imageUrl, author, publishedDate, description, categories, fullDescription) {
        this.title = title;
        this.link = link;
        if (imageUrl && imageUrl.length > 0)
            this.imageUrl = imageUrl;
        this.author = author;
        this.publishedDate = publishedDate;
        this.description = description;
        if (categories != null && !Array.isArray(categories))
            this.categories = [categories];
        else
            this.categories = categories;
        this.fullDescription = fullDescription;
    }
    return NewsItem;
}());
exports.NewsItem = NewsItem;
//# sourceMappingURL=newsitem.js.map