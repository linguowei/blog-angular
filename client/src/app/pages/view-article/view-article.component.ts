import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import marked from 'marked';
import highlight from 'highlight.js';
import Gitment from '../../../assets/gitment/gitment.js';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewArticleComponent implements OnInit, OnDestroy {
  articleDetail = '';

  constructor() { }

  ngOnInit() {
    const topBar = <HTMLElement>document.querySelector('.top-bar');
    topBar.style.display = 'none';
    this.articleDetail = JSON.parse(localStorage.getItem('articleDetail'));
    this.articleDetail['articleContent'] =  marked(this.articleDetail['articleContent'], {
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

    // 评论系统
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
      id: this.articleDetail['_id'],
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

  ngOnDestroy() {
    const topBar = <HTMLElement>document.querySelector('.top-bar');
    topBar.style.display = 'block';
  }

}
