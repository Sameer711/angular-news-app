export class NewsItem
{
    title: string;
    link: string;
    imageUrl: string;
    author: string;
    publishedDate: string;
    description: string;
    categories: string[];
    fullDescription: string;
    feedType: number;
            
    constructor(
    title: string,
    link: string ,
    imageUrl: string,
    author: string,
    publishedDate: string,
    description: string,
    categories: any,
    fullDescription: string,
    feedType: number) 
    {
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
        this.feedType = feedType;
            
       
    }
}