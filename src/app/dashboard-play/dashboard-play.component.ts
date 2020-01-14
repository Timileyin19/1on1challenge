import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-play',
  templateUrl: './dashboard-play.component.html',
  styleUrls: ['./dashboard-play.component.css']
})
export class DashboardPlayComponent implements OnInit {
  today = new Date();
  jstoday = '';

  constructor() { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
   }

  ngOnInit() {
  }

}
