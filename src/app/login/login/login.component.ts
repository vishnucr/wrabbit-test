import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/_helpers/auth.service';
import { UserService } from '@app/_helpers/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // login form of type FormGroup
  errorMessage: string;
  users = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    // building the form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // not the ideal place, but as per requirement
    this.userService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.users = this.userService.SanitizeUser(this.users.results);
        window.localStorage.setItem('users', JSON.stringify(this.users));
      });
  }

  // getter for the forms controls
  public get f() { return this.loginForm.controls; }

  submit() {
    this.authService.login(this.f.username.value, this.f.password.value);
    this.errorMessage = this.authService.errorMessage;
  }

}
