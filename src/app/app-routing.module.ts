import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerPostComponent } from './forum-post-validation/server-post/server-post.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ValidationRobotComponent } from './validation-robot/validation-robot.component';

const routes: Routes = [
  {path: 'post-validation/server', component: ServerPostComponent},
  {path: 'validation-robot/server', component: ValidationRobotComponent},
  {path: '', component: HomePageComponent},
  {path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
