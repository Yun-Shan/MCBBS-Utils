import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './share/shared.module';
import { ForumPostValidationModule } from './forum-post-validation/forum-post-validation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ForumPostValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
