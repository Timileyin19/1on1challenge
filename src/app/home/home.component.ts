import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.decodedToken;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
