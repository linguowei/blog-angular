import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ArticleService {
  allArticle = [];
  allArticle$ = new BehaviorSubject<Array<object>>(this.allArticle);

  constructor(
    private http: HttpClient
  ) {
    this.getAllArticle();
  }


  // 获取文章数据
  getAllArticle() {
    this.http.get('/api/client/articleList')
      .subscribe((res) => {
        this.allArticle$.next(res['data'].reverse());
      });
  }
}
