import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@app/_models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData = null;
    errorMessage = null;
    constructor(private http: HttpClient, private router: Router) { }
    login(username: string, password: string) {
        // should validate from an external server for security purpose
        this.http.get('/assets/user.json')
            .subscribe(res => {
                this.userData = res;
                if (this.userData.username === username && this.userData.password === password) {
                    window.localStorage.setItem('user', this.userData);
                    this.router.navigate(['home']);
                    this.errorMessage = null;
                } else {
                    this.userData = null;
                    window.localStorage.removeItem('user');
                    this.errorMessage = ' invalid Credentials';
                }
            });
    }

    logout() {
        window.localStorage.removeItem('user');
    }

}
