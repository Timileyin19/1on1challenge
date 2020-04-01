import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-my-games',
  templateUrl: './dashboard-my-games.component.html',
  styleUrls: ['./dashboard-my-games.component.css']
})
export class DashboardMyGamesComponent implements OnInit {

  // HINT: Navigate through all the available "Bet" and display the ones that has the same "ID" as the currently logged in User.

  today = new Date();
  jstoday = '';

  // games;


  constructor() { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
  }

  ngOnInit() {
    
  }

}
