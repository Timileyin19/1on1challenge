import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-challenge',
  templateUrl: './dashboard-challenge.component.html',
  styleUrls: ['./dashboard-challenge.component.css']
})
export class DashboardChallengeComponent implements OnInit {

  // HINT: Populate the Table Using the "Bet" endpoint and if the User challenge any of the Bet, then just do an update functionality on the say "Bet" endpoint

  today = new Date();
  jstoday = '';


  constructor() { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
  }

  ngOnInit() {
  }

}
