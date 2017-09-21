import { style } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { ArticleService } from '../../services/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import marked from 'marked';
import highlight from 'highlight.js';
import Gitment from '../../../assets/gitment/gitment.js';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewArticleComponent implements OnInit, OnDestroy {
  articleDetail: ArticleDetail = {
    articleContent: '',
    date: '',
    label: '',
    state: '',
    title: '',
    __v: 0,
    _id: ''
  };
  articleId = '';
  articleServiceSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.articleId = params.id;
    });
    const topBar = <HTMLElement>document.querySelector('.top-bar');
    topBar.style.display = 'none';

    this.articleDetail = JSON.parse(localStorage.getItem('articleDetail'));
    if (this.articleDetail === null) {
      this.articleServiceSub = this.articleService.allArticle$.subscribe((data) => {
        data.forEach((item: ArticleDetail) => {
          if (item._id === this.articleId) {
            this.articleDetail = item;
            this.renderHighlight();
            this.renderGitment();
          }
        });
      });
    } else {
      this.renderHighlight();
      this.renderGitment();
    }

    const progressBar = <HTMLElement>document.querySelector('.progress-bar');
    document.querySelector('.view-article-wrap').scrollTop = 0;
    document.querySelector('.view-article-wrap').addEventListener('scroll', () => {
      const scrollHeight = document.querySelector('.view-article-wrap').scrollHeight - window.innerHeight; // 滚动高度
      const scrollTop = document.querySelector('.view-article-wrap').scrollTop; // 滚动内容距离顶部的高度
      const percentage = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = percentage + 'vw';
    });

    const footer = <HTMLElement>document.querySelector('.footer');
    footer.style.display = 'none';
  }

  ngOnDestroy() {
    const topBar = <HTMLElement>document.querySelector('.top-bar');
    topBar.style.display = 'block';
    if (this.articleDetail instanceof Subscription) {
      this.articleServiceSub.unsubscribe();
    }

    const footer = <HTMLElement>document.querySelector('.footer');
    footer.style.display = 'block';
  }

  // 语法高亮
  private renderHighlight() {
    this.articleDetail.articleContent =  marked(this.articleDetail.articleContent, {
      renderer: new marked.Renderer(),
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: true,
      smartLists: true,
      smartypants: true,
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    });
  }

  // 评论系统
  private renderGitment() {
    const el = <HTMLElement>document.querySelector('.gitment_id');
    const myTheme = {
      render(state, instance) {
        const container = document.createElement('div');
        container.lang = 'en-US';
        container.className = 'gitment-container gitment-root-container';
        container.appendChild(instance.renderEditor(state, instance));
        container.appendChild(instance.renderComments(state, instance));
        return container;
      },
    };
    const gitment = new Gitment({
      id: this.articleDetail._id,
      owner: 'linguowei',
      repo: 'blog-comment',
      oauth: {
        client_id: 'd7c66377574e5e6acfe5',
        client_secret: '7c52883d0368ee18a496491b9695d506f6890ccf',
      },
      theme: myTheme
    });
    gitment.render(el);
  }
}

interface ArticleDetail {
  articleContent: string;
  date: string;
  label: string;
  state: string;
  title: string;
  __v: number;
  _id: string;
}
