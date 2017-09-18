import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// 拦截器 interceptor
import { GlobalResponseInterceptor } from './interceptor/global-response-interceptor';

// 组件 component
import { AppComponent } from './app.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ViewComponent } from './pages/view/view.component';
import { TagComponent } from './pages/tag/tag.component';
import { ClassificationComponent, ClassificationTabsContentHeightDirective } from './pages/classification/classification.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ButtonComponent } from './component/button/button.component';

// 模块 module
import { AppRoutingModule } from './app-routing.module';

// 指令 directive
import { MarkdownEditorDirective } from './directives/markdown-editor/markdown-editor.directive';

// 管道 pipe
import { ArticleContentPipe } from './pipe/article-content/article-content.pipe';
import { ArticleStatePipe } from './pipe/article-state/article-state.pipe';

// 服务 service
import { ArticleService } from './services/article/article.service';
import { TagService } from './services/tag/tag.service';
import { MsgService } from './services/msg/msg.service';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    TagComponent,
    ClassificationComponent,
    DropdownComponent,
    ButtonComponent,
    MarkdownEditorDirective,
    ClassificationTabsContentHeightDirective,
    ArticleContentPipe,
    ArticleStatePipe,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalResponseInterceptor,
      multi: true,
    },
    MsgService,
    TagService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
