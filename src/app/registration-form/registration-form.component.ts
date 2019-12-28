import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  user: any;
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;      // make all the properties in the config to be optional


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'YYYY-MM-DD'
    }

    this.createRegisterForm();
  }

  createRegisterForm() {
    // Form Builder make it a little bit less typing to create a Reactive form
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      username: ['', Validators.required], 
      phoneNumber: ['', Validators.required], 
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]], 
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatcValidator});
  }

  // Custom Validator
  passwordMatcValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {

    this.user = JSON.stringify(this.registerForm.value);

    if(this.registerForm.valid) {
      this.authService.register(this.user).subscribe((res) => {
        this.alertify.success('Registration Successful');

      }, error => {
        this.alertify.error(error);

      }, () => {
        // next thing to do after the subscription is done or completed
        // Login the User in Order to be able to get the Id of the User
        var username = this.registerForm.value.username;
        var password = this.registerForm.value.password;
        this.model.username = username;
        this.model.password = password;
        var userToLogin = JSON.stringify(this.model);
        this.authService.login(userToLogin)
          .subscribe(next => {
            console.log('Logged in successfully');
          }, error => {
            this.alertify.error(error);
          }, () => {
              // navigate the User to the activation page
              this.router.navigate(['/validate/email']);
          });
      });
    }
  }

}
