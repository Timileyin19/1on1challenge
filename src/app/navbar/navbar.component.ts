import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  adminLoggedIn() {
    return this.authService.adminLoggedIn();
  }

  logout() {
    // delete all the set values once the User log out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('detailedUser');
    this.authService.decodedToken = null; 
    this.authService.currentUser = null; 
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
