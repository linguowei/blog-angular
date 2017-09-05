import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TagService {
  allTag = []
  allTag$ = new BehaviorSubject<Array<object>>(this.allTag)

  constructor(
    private http: HttpClient
  ) { 
    this.getAllTag()
  }
  

  getAllTag() {
    this.http.get('/api/client/tagList')
      .subscribe((res) => {
        if (res['code'] === 200) {
          this.allTag$.next(res['data'])
        }
      })
  }
}
