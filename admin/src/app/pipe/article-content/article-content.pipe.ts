import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleContent'
})
export class ArticleContentPipe implements PipeTransform {
  transform(value: String): String {
    return value.replace(/[^\u4e00-\u9fa5]/gi, '');
  }
}
