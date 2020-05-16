import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewsDetails, NewsResponse } from "../model/news-details";

const apiUrl = "https://hn.algolia.com/api/v1/search?tags=front_page";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getNewsDetails(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(apiUrl);
  }
}
