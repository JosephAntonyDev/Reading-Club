import { Component } from '@angular/core';
import { Users_Service } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent {
  username: string = '';
  password: string = '';

  constructor(private usersService: Users_Service, private router: Router) {}

  register(): void {
    const userData = {
      name_User: this.username,
      passwords: this.password
    };
    
    this.usersService.registerUser(userData).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']); // Redirigir al usuario a la página de login después del registro exitoso
      },
      error => {
        console.error('Registro fallido', error);
      }
    );
  }
}
