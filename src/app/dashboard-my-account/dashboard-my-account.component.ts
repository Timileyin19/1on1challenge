import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-my-account',
  templateUrl: './dashboard-my-account.component.html',
  styleUrls: ['./dashboard-my-account.component.css']
})
export class DashboardMyAccountComponent implements OnInit {

  // HINT: Load the full detail of the Particular "User" and attach it to the form display and give room for the User to Update his/her details or personal information.

  today = new Date();
  jstoday = '';

  user;
  detailedUser;

  constructor(private userService: UserService, private alertify: AlertifyService) { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
  }

  ngOnInit() {
    // Load the details of the currently logged-in User 
    this.user = JSON.parse(localStorage.getItem('user'));
    
    this.userService.getUser(this.user.id)
      .subscribe(data => {
        this.setUserDetail(data);
      }, error => {
        this.alertify.error("Something Went Wrong, please reload Page");
        console.log("Get User by ID Error", error);
      });
  }

  setUserDetail(userDetail) {
    this.detailedUser = userDetail;
  }

  updateProfile() {
    // console.log("ID:", id);
    console.log("Update Details:", this.detailedUser);
    this.userService.updateUser(this.detailedUser);
  }

}

// Specific User Details (GET USER BY ID)
// "id": 16,
//   "fullName": "My Full Name Test",
//   "username": "timileyin19",
//   "email": null,
//   "phoneNumber": "08088888888",
//   "gender": "male",
//   "age": 29,
//   "city": "Banana Island",
//   "country": "Nigeria",
//   "creationDate": "2019-12-25T20:12:04.746456",
//   "lastActive": "2019-12-25T20:12:04.7465",
//   "activationCode": "1on1-70102013",
//   "isActivated": true,
//   "profilePicLink": null,
//   "walletAddress": null,
//   "balance": 0

