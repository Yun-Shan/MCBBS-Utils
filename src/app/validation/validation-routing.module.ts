import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerPostComponent } from '../forum-post-validation/server-post/server-post.component';
import { ValidationResultComponent } from './validation-result/validation-result.component';
import { ValidationRobotComponent } from './validation-robot/validation-robot.component';


const routes: Routes = [
  {path: 'server-validation/post', component: ServerPostComponent},
  {
    path: 'server-validation/robot', children: [
      {path: 'thread/:tid', component: ValidationResultComponent},
      {path: '**', component: ValidationRobotComponent}
    ]
  },
  {path: 'validation-robot/server', redirectTo: 'server-validation/robot'},
  {path: 'forum-validation/server', redirectTo: 'server-validation/post'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidationRoutingModule { }
