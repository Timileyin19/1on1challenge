import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { GamesService } from '../_services/games.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  bets;
  user;
  today = new Date();
  jstoday = '';

  // It is the CRUD of "BET" that I will use to manipulate this functionality

  constructor(private gameService: GamesService) {
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.gameService.getBets()
      .subscribe(data => {
        this.setBets(data);
      }, error => {
        console.log("Error while fetching Bets: ", error);
      })
  }

  setBets(bets) {
    this.bets = bets;
    console.log(this.bets);
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


