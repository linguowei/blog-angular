import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { ArticleService } from '../../services/article/article.service';
import { TagService } from '../../services/tag/tag.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit, OnDestroy {
  dropdownMenuSub: Subscription;
  dropdownMenu = [];
  title = '';
  content = '';
  tagList = [];
  articleInfo = {
    articleContent: String,
    date: '',
    label: [],
    title: '',
    state: '',
    __v: Number,
    _id: ''
  };

  constructor(
    private tagService: TagService,
    private articleService: ArticleService,
    private msg: MsgService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dropdownMenuSub = this.tagService.tagList$.subscribe((data) => {
      this.dropdownMenu = data;
    });

    this.articleInfo = JSON.parse(localStorage.getItem('articleItemInfo'));
    this.tagList = this.articleInfo.label;
    this.title = this.articleInfo.title;
  }

  ngOnDestroy() {
    this.dropdownMenuSub.unsubscribe();
  }

  selectItem(data) {
    this.tagList = [];
    this.tagList.push(data);
  }

  delectLabelItem(index) {
    this.tagList.splice(index, 1);
  }

  markdownValueChange(data) {
    this.content = data;
  }

  // 更新文章
  save(articleState) {
    if (this.title === '' || this.content === '' || this.tagList.length === 0) {
      this.msg.info('请输入完整的笔记信息！');
    } else {
      const sub = this.articleService._modifyArticle({
        title: this.title,
        articleContent: this.content,
        label: this.tagList[0].tagName,
        date: new Date(this.articleInfo.date),
        state: articleState,
        _id: this.articleInfo._id
      }).subscribe((res) => {
        if (res['code'] === 200) {
          this.msg.info('修改成功！');
          this.articleService._updateAllArticle();
          res['data'].label = this.tagList;
          localStorage.setItem('articleItemInfo', JSON.stringify(res['data']));
          this.router.navigate(['/admin/view']);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/view']);
  }

}
