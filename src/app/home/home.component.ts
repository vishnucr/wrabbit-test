import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/_helpers/auth.service';
import { UserService } from '@app/_helpers/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.userService.initUsers();
    this.subscribeUsers();
  }

  subscribeUsers() {
    this.userService.subscribeUsers()
      .subscribe(res => {
        this.users = res;
      });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
