import { Router } from '@angular/router';
import { ArticleService } from './../../services/article/article.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Pipe({name: 'filterNoteContent'})
export class FilterNoteContentPipe implements PipeTransform {
  transform(value: String): String {
    return value.replace(/[^\u4e00-\u9fa5]/gi, '');
  }
}

@Component({
  selector: 'app-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.scss']
})
export class LatestArticlesComponent implements OnInit, OnDestroy {
  articleList = [];
  articleListSub: Subscription;

  constructor(
    private http: HttpClient,
    private articleService: ArticleService,
    private router: Router
  ) {
    this.articleListSub = this.articleService.allArticle$.subscribe((data) => {
      this.articleList = data;
    });
  }

  ngOnDestroy() {
    this.articleListSub.unsubscribe();
  }

  ngOnInit() {

  }

  viewArticle(data) {
    localStorage.setItem('articleDetail', JSON.stringify(data));
    this.router.navigate(['/view', data._id]);
  }

}
