import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { Subscription } from 'rxjs/Subscription';
import { ArticleService } from '../../services/article/article.service';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit, OnDestroy {
  dropdownMenuSub: Subscription;
  dropdownMenu = [];
  title = '';
  content = '';
  tagList = [];

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

  // 保存文章
  save(articleState) {
    if (this.title === '' || this.content === '' || this.tagList.length === 0) {
      this.msg.info('请输入完整的文章信息！');
    } else {
      const sub = this.articleService._addArticle({
        title: this.title,
        articleContent: this.content,
        label: this.tagList[0].tagName,
        date: new Date(),
        state: articleState
      }).subscribe((res) => {
        if (res['code'] === 200) {
          this.msg.info('保存成功！');
          this.articleService._updateAllArticle();
          res['data'].label = this.tagList;
          localStorage.setItem('articleItemInfo', JSON.stringify(res['data']));
          this.router.navigate(['/admin/view']);
        }
      });
    }
  }

}
