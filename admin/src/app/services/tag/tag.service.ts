import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TagService {
  tagList = [];
  tagList$ = new BehaviorSubject<Array<object>>(this.tagList);

  constructor(
    private http: HttpClient
  ) {
    this._updateTagList();
  }

  // 新增
  _addTag(name: String) {
    this.http.post('/api/admin/addTag', {
      tagName: name
    })
    .subscribe((data) => {
      this._updateTagList();
    });
  }

  // 删除
  _deleteTag(id) {
    this.http.post('/api/admin/deleteTag', {
      id: id
    }).subscribe((data) => {
        this._updateTagList();
      });
  }

  _updateTagList() {
    this.http.get('/api/admin/tagList')
      .subscribe((res) => {
        this.tagList$.next(res['data'].reverse());
      });
  }

}
