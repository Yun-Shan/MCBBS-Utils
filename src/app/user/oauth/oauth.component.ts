import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

  constructor(outlet: RouterOutlet, userService: UserService, router: Router) {
    switch (outlet.activatedRouteData.type) {
      case 'mcbbs': {
        userService.handleLogin(window.location.search.substring(1))
          .then((res) => {
            router.navigate(['/user']).then();
          });
      }
    }
  }

  ngOnInit(): void {
  }

}
