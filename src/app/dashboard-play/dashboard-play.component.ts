import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { GamesService } from '../_services/games.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard-play',
  templateUrl: './dashboard-play.component.html',
  styleUrls: ['./dashboard-play.component.css']
})
export class DashboardPlayComponent implements OnInit {
  
  // HINT: Use "Games" to populate the Table and when the User predict any Game, add it to "Bet"
  // NB: Only the Games that have their "Status" as "true" will only be available for the User to be predicted

  // Advice: The table of this component has deform, copy the table of the "dashboard-home" component


  today = new Date();
  jstoday = '';

  games;
  leagues;

  constructor(private gameService: GamesService, private alertify: AlertifyService) { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
   }

  ngOnInit() {
    this.gameService.getGames()
      .subscribe(data => {
        this.setGames(data);
      }, error => {
        console.log("Error while fetching Game: ", error);
      });

      this.gameService.getLeagues()
        .subscribe(data => {
          this.setLeagues(data);
        }, error => {
          console.log("Error while fetching League: ", error);
        });
  }

  setGames(games) {
    this.games = games;
    // console.log( this.games);
  }

  setLeagues(leagues) {
    this.leagues = leagues;
  }

  getLeagueById(id) {
    var league, leagues = this.leagues;
    for (let l of leagues) {
      if (l.id == id)
        league = l;
    }
    return league;
  }

  getGameByID(id) {
    var game, games = this.games;
    for (let g of games) {
      if (g.id == id) 
        game = g; 
    }
    // console.log(game);
    return game;
  }

}

// id: 10
// aTeam: "Arsenal"
// bTeam: "Chelsea"
// description: "Champion League"
// startTime: "2020-01-24T14:25:04.817"
// betStartTime: "2020-01-24T14:25:04.817"
// betEndTime: "2020-01-24T14:25:04.817"
// isOpen: false
// sport: null
// league: null
// sportId: 2
// leagueId: 2
