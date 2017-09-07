import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { ArticleService } from './../../services/article/article.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import marked from 'marked';
import highlight from 'highlight.js';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {
  isShowEdit = false;
  articleInfo = {
    content: '',
    date: String,
    label: String,
    title: String,
    state: String,
    __v: Number,
    _id: String
  };
  isShowDelect = false;
  catalog = [];

  constructor(
    private articleService: ArticleService,
    private msgService: MsgService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.articleInfo = JSON.parse(localStorage.getItem('articleItemInfo'));
    this.articleInfo.content =  marked(this.articleInfo['articleContent'], {
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

    // 动态计算preview区域高度
    const preview = <HTMLElement>document.querySelector('.preview');
    preview.style.height = window.innerHeight - 170 + 'px';
    preview.style.maxHeight = window.innerHeight - 170 + 'px';
    preview.style.overflow = 'auto';

    const contentDom = this.parseDom(this.articleInfo.content); // 把html字符串装换成DOM
    // 提取笔记内容生成目录信息
    Array.prototype.slice.call(contentDom.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((item, index) => {
      item.id = item.localName + '-' + index;
      let active;
      index === 0 ? active = true : active = false;
      this.catalog.push({
        tagName: item.localName,
        text: item.innerText,
        href: '#' + item.localName + '-' + index,
        el: item,
        isActive: active
      });
    });
    const previewDom  = <HTMLElement>document.querySelector('.preview');
    const catalogDom = <HTMLElement>document.querySelector('.catalog-wrap');
    previewDom.appendChild(contentDom);
    if (this.catalog.length === 0) {
      return;
    }
    previewDom.addEventListener('scroll', this.throttle(() => {
      this.catalog.forEach((item, index) => {
        if (index !== this.catalog.length - 1) {
          if ((previewDom.scrollTop + 125) > item.el.offsetTop && (previewDom.scrollTop + 125) < this.catalog[index + 1].el.offsetTop) {
            this.catalog.forEach(j => j.isActive = false);
            item.isActive = true;
          }
        }else {
          if ((previewDom.scrollTop + 125) > item.el.offsetTop) {
            this.catalog.forEach(j => j.isActive = false);
            item.isActive = true;
          }
        }
      });
      const activeDom = <HTMLElement>catalogDom.querySelector('.active');
      catalogDom.scrollTop = activeDom.offsetTop - window.innerHeight / 2;
    }, 200));

  }

  delect() {
    this.isShowDelect = true;
  }

  cancel() {
    this.isShowDelect = false;
  }

  confirmDelete() {
    const id = this.articleInfo._id;
    this.articleService._deleteArticle(id).subscribe((res) => {
      if (res['code'] === 200) {
        this.isShowDelect = false;
        this.msgService.info('删除成功！');
        this.router.navigate(['/admin/add']);
      }
    });
  }

  editNote() {
    this.router.navigate(['/admin/edit']);
  }

  catalogNavigation(data) {
    const previewDom  = <HTMLElement>document.querySelector('.preview');
    const activeNode = <HTMLElement>previewDom.querySelector(`${data.href}`);
    previewDom.scrollTop = activeNode.offsetTop - 120;
  }

  private parseDom(arg) {
    const objl = document.createElement('div');
    objl.innerHTML = arg;
    return objl;
  }

  private throttle(fn, interval = 300) {
    let canRun = true;
    return function () {
      if (!canRun) {
        return;
      }
      canRun = false;
      setTimeout(function() {
        fn.apply(this, arguments);
        canRun = true;
      }, interval);
    };
  }

}
