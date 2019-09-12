import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerPostComponent } from './forum-post-validation/server-post/server-post.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: 'post-validation/server', component: ServerPostComponent},
  {path: '', component: HomePageComponent},
  {path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
