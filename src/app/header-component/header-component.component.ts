import { Component } from '@angular/core';
import { faBars, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Users_Service } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {
  faBars = faBars;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  constructor(private usersService: Users_Service, private router: Router) {}

  logout(): void {
    this.usersService.logout();
    this.router.navigate(['/login']);
  }
}
