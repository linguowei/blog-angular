import { IndexComponent } from './pages/index/index.component';
import { ViewComponent } from './pages/view/view.component';
import { EditComponent } from './pages/edit/edit.component';
import { ClassificationComponent } from './pages/classification/classification.component';
import { TagComponent } from './pages/tag/tag.component';
import { AddComponent } from './pages/add/add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin/index',
    component: IndexComponent,
    children: []
  },
  {
    path: 'admin/add',
    component: AddComponent,
    children: []
  },
  {
    path: 'admin/tag',
    component: TagComponent,
    children: []
  },
  {
    path: 'admin/classification',
    component: ClassificationComponent,
    children: []
  },
  {
    path: 'admin/edit',
    component: EditComponent,
    children: []
  },
  {
    path: 'admin/view',
    component: ViewComponent,
    children: []
  },
  {
    path: '**',
    redirectTo: 'admin/add',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
