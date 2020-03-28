import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  user;
  today = new Date();
  jstoday = '';

  constructor(private authService: AuthService, private userService: UserService) {
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
    // this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }

}


// User
// id: 20
// fullName: "Dele Taiwo"
// username: "taiwo12"
// gender: "male"
// city: "Ibadan"
// country: "Nigeria"
// age: 18
// creationDate: "2019-12-28T20:17:58.141137"
// lastActive: "2019-12-28T20:17:58.141182"
// profilePicLink: null
// walletAddress: "9f0bbf98-293f-4361-80c5-88af006344be"
// balance: 0
// email: "deletaiwo@gmail.com"

