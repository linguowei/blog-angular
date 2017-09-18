import { Router } from '@angular/router';
import { ArticleService } from '../../services/article/article.service';
import { TagService } from '../../services/tag/tag.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[classificationTabsContentHeight]'
})
export class ClassificationTabsContentHeightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.height = window.innerHeight - 70 + 'px';
    el.nativeElement.style.maxHeight = window.innerHeight - 70 + 'px';
    el.nativeElement.style.overflow = 'auto';
  }
}

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit, OnDestroy {
  tagListSub: Subscription;
  tagList = [];
  content = '全部';
  tabIsActive = true;
  allArticleSub: Subscription;
  allArticle = [];
  currentNoteList = [];

  constructor(
    private tagService: TagService,
    private articleService: ArticleService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.tagListSub = this.tagService.tagList$.subscribe((data) => {
      this.tagList = data;
    });

    this._activeFalse();

    this.allArticleSub = this.articleService.allNote$.subscribe((data) => {
      this.allArticle = data;
      this.currentNoteList = data;
    });
  }

  ngOnDestroy() {
    this.tagListSub.unsubscribe();
    this.allArticleSub.unsubscribe();
  }

  _activeFalse() {
    this.tagList.map((item) => {
      item['tabIsActive'] = false;
    });
  }

  all() {
    this._activeFalse();
    this.tabIsActive = true;
    this.content = '全部';
    this.currentNoteList = this.allArticle;
  }

  tabClick(data) {
    this.tabIsActive = false;
    this._activeFalse();
    data.tabIsActive = true;

    const temporary = [];
    this.allArticle.forEach((item, index) => {
      const jsonStringify = JSON.stringify(item.label);
      if (jsonStringify.indexOf(data.tagName) !== -1) {
        temporary.push(item);
      }
    });
    this.currentNoteList = temporary;
  }

  viewNote(data) {
    this.router.navigate(['/admin/view']);
    let arr = [];
    arr.push({
      tagName: data.label
    });
    data.label = arr;
    localStorage.setItem('articleItemInfo', JSON.stringify(data));
  }

}
