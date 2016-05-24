"use strict";
var NewsItem = (function () {
    function NewsItem(title, link, image, author, publishedDate, description, categories, fullDescription) {
        this.title = title;
        this.link = link;
        this.image = image;
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