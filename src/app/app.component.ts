import { Component, OnInit } from '@angular/core';
import { LogUpdateService } from './log-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly title = 'MCBBS工具箱';
  readonly navList = [
    {
      name: '首页',
      path: '/'
    },
    {
      name: '服务器帖验证',
      path: '/server-validation/post'
    },
    {
      name: '自动化验证',
      path: '/server-validation/robot'
    },
    /*
    {
      name: '用户信息',
      path: '/user'
    }
    */
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
