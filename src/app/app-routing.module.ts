import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerPostComponent } from './forum-post-validation/server-post/server-post.component';

const routes: Routes = [
  {path: 'post-validation/server', component: ServerPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
