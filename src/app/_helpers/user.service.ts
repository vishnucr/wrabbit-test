import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = null;
  constructor(private http: HttpClient, ) { }

  getUsers() {
    return this.http.get('https://randomuser.me/api/0.8/?results=5');
  }

  addUser(user) {
    const newUsers = JSON.parse(window.localStorage.getItem('users'));
    this.users.push(user);
    newUsers.push(user);
    window.localStorage.setItem('users', JSON.stringify(newUsers));
  }

  SanitizeUser(users: Array<any>) {
    const sanitizedUser = [];
    for (const user of users) {
      sanitizedUser.push(user.user);
    }
    return sanitizedUser;
  }

  initUsers() {
    this.users = JSON.parse(window.localStorage.getItem('users'));
  }

  subscribeUsers(): Observable<any> {
    return of(this.users);

  }

  searchUser(key) {
    let name;
    if (key === '') {
      this.users = JSON.parse(window.localStorage.getItem('users'));
      return;
    } else {
      this.users = this.users.filter(item => {
        name = `${item.name.first} ${item.name.last}`;
        if (name.includes(key)) {
          return true;
        } else {
          return false;
        }
      });
    }
  }
}
