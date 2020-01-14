import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user;
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('detailedUser'));
  }

}
