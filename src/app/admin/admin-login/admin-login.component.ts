import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  model: any = {};

  constructor(private alertify: AlertifyService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  adminLogin() {
    if (this.model.username == 'admin1on1' && this.model.password == 'myAdmin.Pass') {
      this.alertify.success('You are logged in as an Admin');
     
      // Remove the possible content that is inside the localstorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      localStorage.removeItem('detailedUser');
      this.authService.decodedToken = null; 
      this.authService.currentUser = null; 

      localStorage.setItem('admin', JSON.stringify(true));
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.alertify.error('Invalid Admin Login Details');
      this.router.navigate(['/1on1-admin']);
    }
  }


  adminLoggedIn() {
    return this.authService.adminLoggedIn;
  }

}
