import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewsDetails, NewsResponse } from "../model/news-details";

const apiUrlFirst =
  "https://hn.algolia.com/api/v1/search?tags=front_page&page=0";
const apiUrlNext =
  "https://hn.algolia.com/api/v1/search?tags=front_page&page=1";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getNewsDetailsFirstPage(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(apiUrlFirst);
  }
  getNewsDetailsNextPage(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(apiUrlNext);
  }
}
