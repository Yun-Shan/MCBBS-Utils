import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly URL_MCBBS_LOGIN = 'api/oauth2/mcbbs/login';
  private static readonly URL_MCBBS_GET_INFO = 'api/oauth2/mcbbs/get_info';
  private static readonly URL_USER = 'api/user/';

  get logged(): boolean {
    return this._logged;
  }

  get user(): User {
    return this._user;
  }

  constructor(private http: HttpClient, private router: Router) {
    const userJson = localStorage.getItem('mcbbs_user_info');
    if (userJson) {
      try {
        this._user = JSON.parse(userJson);
        this._logged = true;
      } catch (e) {
      }
    }
  }

  // tslint:disable-next-line:variable-name
  private _logged = false;
  // tslint:disable-next-line:variable-name
  private _user: User;

  requestLogin() {
    this.http.get(UserService.URL_MCBBS_LOGIN, {responseType: 'text'}).subscribe({
      next: (res: any) => {
        window.location.href = res;
      },
      error: err => {
        console.log(err);
        localStorage.removeItem('mcbbs_user_info');
      }
    });
  }

  handleLogin(redirectQuery: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(UserService.URL_MCBBS_GET_INFO + '?' + redirectQuery).subscribe({
        next: (res: any) => {
          if (res.uid) {
            const user: User = {
              uid: res.uid,
              name: res.username
            };
            this._user = user;
            this._logged = true;
            localStorage.setItem('mcbbs_user_info', JSON.stringify(user));
            resolve(user);
          }
        },
        error: err => {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  fetchUserData(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(UserService.URL_USER + this.user.uid + '/data').subscribe({
        next: (res: any) => {
          console.log(res);
          resolve(res);
        },
        error: err => {
          console.log(err);
          reject(err);
        }
      });
    });
  }
}
