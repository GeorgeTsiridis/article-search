import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const articles = [
  {
    type: "articles",
    id: "1",
    attributes: {
      title: "JSON:API paints my bikeshed!",
      body: "The shortest article. Ever."
    }
  },
  {
    type: "articles",
    id: "2",
    attributes: {
      "title": "Learning Angular!",
      "body": "The longest article. Ever."
    }
  },
  {
    type: "articles",
    id: "3",
    attributes: {
      title: "Typescript 101: A Begginer's Guide",
      body: "Everything you need to know about TS."
    }
  },
  {
    type: "articles",
    id: "4",
    attributes: {
      title: "NodeJS: The basics",
      body: "Getting into NodeJS and it's use cases."
    }
  }
]

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'https://example.com/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    const observable = of(articles);
    return observable;
  }

}
