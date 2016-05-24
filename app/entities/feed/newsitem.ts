export class NewsItem
{
    title: string;
    link: string;
    image: string;
    author: string;
    publishedDate: string;
    description: string;
    categories: string[];
    fullDescription: string;
            
    constructor(
    title: string,
    link: string ,
    image: string,
    author: string,
    publishedDate: string,
    description: string,
    categories: any,
    fullDescription: string) 
    {
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
}