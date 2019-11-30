import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/_helpers/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users;
  @Output() searchComplete = new EventEmitter();
  searchFrom: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.searchFrom = this.formBuilder.group({
      key: ['']
    });
  }

  public get f() { return this.searchFrom.controls; }

  search() {
    this.userService.searchUser(this.f.key.value);
    this.searchComplete.emit(null);
  }

  clear() {
    this.searchFrom.reset();
    this.userService.searchUser('');
    this.searchComplete.emit(null);
  }
}
