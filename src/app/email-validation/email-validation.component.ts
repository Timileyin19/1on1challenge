import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css']
})
export class EmailValidationComponent implements OnInit {
  user;
  code;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }


  ngOnInit() {
    this.user = this.authService.currentUser;
  }

  activateAcct() {
    if (this.code) {
      this.authService.activateEmail(this.code)
        .subscribe(res => {
          this.alertify.success('Email Activated Successfully');
        }, error => {
          this.alertify.error(error);
          this.router.navigate(['/validate/email']);
        }, () => {
          this.router.navigate(['/dashboard']);
        })
    }
  }

}
