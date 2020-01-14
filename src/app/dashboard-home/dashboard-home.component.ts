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
  detailedUser;
  today = new Date();
  jstoday = '';

  constructor(private authService: AuthService, private userService: UserService) {
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser(this.user.id)
      .subscribe(res => {
        localStorage.setItem('detailedUser', JSON.stringify(res));
      });
    this.setUser();
  }
  
  setUser() {
    this.detailedUser = JSON.parse(localStorage.getItem('detailedUser'));
    // localStorage.setItem('detailedUser', JSON.stringify(this.detailedUser));
  }

}
// today= new Date();
//   jstoday = '';
//   constructor() {
//     this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
//   }

// Detailed User
// id: 20
// fullName: "Dele Taiwo"
// username: "taiwo12"
// email: "deletaiwo@gmail.com"
// phoneNumber: "09034231234"
// gender: "male"
// age: 18
// city: "Ibadan"
// country: "Nigeria"
// creationDate: "2019-12-28T20:17:58.141137"
// lastActive: "2019-12-28T20:17:58.141182"
// activationCode: "1on1-47660415"
// isActivated: false
// profilePicLink: null
// walletAddress: "9f0bbf98-293f-4361-80c5-88af006344be"
// balance: 0

// Details of User 
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
