import { ViewArticleComponent } from './pages/view-article/view-article.component';
import { AboutComponent } from './pages/about/about.component';
import { ArchivesComponent } from './pages/archives/archives.component';
import { TagComponent } from './pages/tag/tag.component';
import { LatestArticlesComponent } from './pages/latest-articles/latest-articles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: LatestArticlesComponent
  },
  {
    path: 'tag',
    component: TagComponent
  },
  {
    path: 'archives',
    component: ArchivesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'view',
    component: ViewArticleComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
