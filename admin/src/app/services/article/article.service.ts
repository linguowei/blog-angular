import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class ArticleService {
  allNote = [];
  allNote$ = new BehaviorSubject<Array<object>>(this.allNote);

  constructor(
    private http: HttpClient
  ) {
    this._updateAllArticle();
  }

  // 添加
  _addArticle(param: EditNote) {
    return this.http.post('/api/admin/addArticle', param);
  }

  // 修改
  _modifyArticle(param: EditNote) {
    return this.http.post('/api/admin/modifyArticle', param);
  }

  // 删除
  _deleteArticle(id) {
    return this.http.post('/api/admin/deleteArticle', {id: id});
  }

  _updateAllArticle() {
    this.http.get('/api/admin/articleList')
      .subscribe((data) => {
        this.allNote$.next(data['data'].reverse());
      });
  }

}

interface EditNote {
  title: string;
  articleContent: string;
  label: string;
  date: Date;
  state: string;
  _id?: string;
}
