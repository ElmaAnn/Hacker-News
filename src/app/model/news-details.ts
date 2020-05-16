export class NewsResponse {
  hits: NewsDetails[];
}

export class NewsDetails {
  comment_text: string;
  url: string;
  author: string;
  title: string;
  num_comments: number;
  deleted?: boolean;

  objectID?: number;
  voteNumber: number = 0;

  constructor(comment_text, url, author, title, num_comments, voteNumber) {
    this.comment_text = comment_text;
    this.url = url;
    this.author = author;
    this.title = title;
    this.num_comments = num_comments;
    this.voteNumber = voteNumber;
    this.deleted = false;
  }
}
