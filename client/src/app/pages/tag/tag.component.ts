import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TagService } from './../../services/tag/tag.service';
import { ArticleService } from './../../services/article/article.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  articleList = [];
  articleListSub: Subscription;
  tagList = [];

  constructor(
    private http: HttpClient,
    private articleService: ArticleService,
    private tagService: TagService,
    private router: Router
  ) {
    this.articleListSub = this.articleService.allArticle$.subscribe((data) => {
      this.articleList = data;
      this.transform();
    });
  }

  ngOnDestroy() {
    this.articleListSub.unsubscribe();
  }

  ngOnInit() {

  }

  transform() {
    // 把文章数据转换成页面渲染需要的格式
    const obj = {};
    let arr = [];
    this.articleList.forEach((item, i) => {
      if (obj[item.label] === undefined) {
        obj[item.label] = item.label;
        arr = [];
        arr.push(item);
        obj['index'] = i;
        this.tagList.push({
          name: item.label,
          data: arr
        });
      } else {
        this.tagList[ obj['index'] ].data.push(item);
      }
    });
  }

  viewArticle(data) {
    localStorage.setItem('articleDetail', JSON.stringify(data));
    this.router.navigate(['/view']);
  }
}
