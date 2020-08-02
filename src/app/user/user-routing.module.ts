import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CheckLoginGuard } from '../auth/check-login.guard';
import { UserIndexComponent } from './user-index/user-index.component';
import { OauthComponent } from './oauth/oauth.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'redirect/mcbbs-oauth2', component: OauthComponent, data: {
      type: 'mcbbs',
    }
  },
  {
    path: 'user',
    canActivate: [CheckLoginGuard],
    canActivateChild: [CheckLoginGuard],
    children: [
      {
        path: '',
        children: [
          {path: '', component: UserIndexComponent},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
