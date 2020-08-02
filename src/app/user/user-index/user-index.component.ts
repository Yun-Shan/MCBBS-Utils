import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  readonly displayedColumns = ['tid', 'edit_time', 'check_result', 'result'];

  success = false;
  data: any;

  loading = true;
  fail = false;

  constructor(public userService: UserService) {
    userService.fetchUserData().then(res => {
      console.log(res);
      this.success = true;
      this.data = res;
      this.loading = false;
    }, err => {
      this.fail = true;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  abs(x: number): number {
    return Math.abs(x);
  }

}
