import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    var userTologin = JSON.stringify(this.model);
    this.authService.login(userTologin)
      .subscribe(next => {
        this.alertify.success('Logged in Successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/dashboard']);
      })
  }
}