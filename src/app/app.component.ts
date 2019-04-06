import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = 'MCBBS Utils';
  readonly navList = [
    {
      name: '服务器帖验证',
      path: '/post-validation/server'
    }
  ];
}
