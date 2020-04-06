import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './share/shared.module';
import { ForumPostValidationModule } from './forum-post-validation/forum-post-validation.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { ValidationRobotComponent } from './validation-robot/validation-robot.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ValidationRobotComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    ForumPostValidationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
