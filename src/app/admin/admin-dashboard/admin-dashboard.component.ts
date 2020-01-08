import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getSport() {
    console.log('Get Sport need ID');
  }

  deleteSport() {
    console.log('Delete Sport need ID');
  }

  getLeague() {
    console.log('Get League need ID');
  }

  deleteLeague() {
    console.log('Delete League need ID');
  }

  getCondition() {
    console.log('Get Condition need ID');
  }

  deleteCondition() {
    console.log('Delete Condition need ID');
  }

  addLeague() {
    console.log('Add League');
  }

  addCondition() {
    console.log('Add Condition');
  }

  updateSport() {
    console.log('Update Sport');
  }

  updateCondition() {
    console.log('Update Condition');
  }

  updateLeague() {
    console.log('Update League');
  }

  addSport() {
    console.log('Add Sport');
  }

}
