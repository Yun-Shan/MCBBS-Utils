import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { SharedModule } from '../share/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { OauthComponent } from './oauth/oauth.component';


@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    UserIndexComponent,
    OauthComponent
  ],
})
export class UserModule {
}
