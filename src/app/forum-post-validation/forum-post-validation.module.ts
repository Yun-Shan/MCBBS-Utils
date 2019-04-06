import { NgModule } from '@angular/core';
import { SharedModule } from '../share/shared.module';
import { ServerPostComponent } from './server-post/server-post.component';
import { PostErrorPipe } from './post-error.pipe';

@NgModule({
  declarations: [ServerPostComponent, PostErrorPipe],
  imports: [
    SharedModule
  ]
})
export class ForumPostValidationModule { }
