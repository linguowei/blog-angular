import { ArticleService } from './../../services/article/article.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit, OnDestroy {
  articleList = []
  articleListSub: Subscription

  constructor(
    private articleService: ArticleService,

  ) { }

  ngOnInit() {
    this.articleListSub = this.articleService.allArticle$.subscribe((data) => {
      this.articleList = data
    })
  }

  ngOnDestroy() {
    this.articleListSub.unsubscribe()
  }

}
