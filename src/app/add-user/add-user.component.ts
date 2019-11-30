import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@app/_helpers/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: this.formBuilder.group({
        title: ['', Validators.required],
        first: ['', Validators.required],
        last: ['', Validators.required]

      }),
      gender: [''],
      email: ['', Validators.pattern('[^@]+@[^\.]+\..+')],
      username: [''],
      password: [''],
      dob: [''],
      phone: ['']
    });
  }

  // get form controls (getter)
  public get f() { return this.userForm.controls; }

  generateUser(form) {
    const user = {};
    for (const item in form) {
      user[item] = form[item].value;
    }
    return user;
  }
  submit() {
    this.userService.addUser(this.generateUser(this.f));
    this.userForm.reset();
  }

}
