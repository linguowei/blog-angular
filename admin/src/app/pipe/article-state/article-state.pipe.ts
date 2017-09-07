import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleState'
})
export class ArticleStatePipe implements PipeTransform {

  transform(value: String): String {
    if (value === 'draft') {
      return '草稿';
    } else if (value === 'publish') {
      return '已发布';
    }
  }

}
