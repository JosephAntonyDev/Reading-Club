import { Component } from '@angular/core';
import { Users_Service } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private usersService: Users_Service, private router: Router) {}

  login(): void {
    const credentials = {
      name_User: this.username,
      passwords: this.password
    };

    this.usersService.loginUser(credentials).subscribe(
      response => {
        console.log('Login successful', response);
        this.usersService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
