// export class Post {
//     postId: number;
//     id: number;
//     name: string;
//     email: string;
//     body: string;
    
// }

export class Entry
{
    title: string;
    link: string ;
    author: string;
    publishedDate: string;
    contentSnippet: string;
    content: string;
    categories: string[];
}

export class Feed
{
     feedUrl : string;
      title : string;
      link : string;
      author : string;
      description : string;
      type : string;
     entries : Entry[];
}

export class ResponseData
{
     feed : Feed;
}

export class GoogleNews
{
      responseData : ResponseData;
      responseDetails: any;
     responseStatus : number;
}