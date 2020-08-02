import { Component, OnInit } from '@angular/core';
import { LogUpdateService } from './log-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly title = 'MCBBS Utils';
  readonly navList = [
    {
      name: '首页',
      path: '/'
    },
    {
      name: '服务器帖验证',
      path: '/post-validation/server'
    },
    {
      name: '自动化验证',
      path: '/validation-robot/server'
    },
    {
      name: '用户信息',
      path: '/user'
    }
  ];
  readonly friendLink = [
  ];
  year: number;

  constructor(public logUpdate: LogUpdateService) {
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
}
