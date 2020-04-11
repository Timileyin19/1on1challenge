import { ActivatedRoute } from '@angular/router';
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
  games;
  isPredictor: boolean = false;
  leagues;
  onGoingGames : any[];
  sports;
  user;
  today = new Date();
  jstoday = '';

  // Done with this Module

  constructor(private gameService: GamesService, private route: ActivatedRoute) {
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.data.subscribe(data => {
      this.bets = data['bets'];
      this.games = data['games'];
      this.sports = data['sports'];
      this.leagues = data['leagues'];
    });
    
      this.onGoingGames = this.setOnGoingGames();
  }

  getGameByID(id) {
    if(this.games) {
      var game, games = this.games;
      for (let g of games) {
        if (g.id == id) 
          game = g; 
      }
      return game;
    } 

    this.onGoingGames = this.setOnGoingGames();
  }

  getLeagueByID(id) {
    if(this.leagues) {
      var league, leagues = this.leagues;
      for(let l of leagues) {
        if (l.id == id) 
          league = l;
      } 
      return league;
    }
  }

  getSportByID(id) {
    if(this.sports) {
      var sport, sports = this.sports;
      for(let s of sports) {
        if(s.id == id) 
          sport = s;
      }
      return sport;
    }
  }

  setOnGoingGames() :any[] {
    var onGoingStakeGames : any[] = [];

      if(this.bets) {
      this.bets.forEach(bet => {
        if(bet.winnersId == 0 || bet.loosersId == 0) {
          if(bet.predictorId == this.user.id || bet.challengerId == this.user.id) {
            onGoingStakeGames.push(bet);
          }
        }
      });
    }
    return onGoingStakeGames;
  }

}


// ===>> Game by Id 
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



// ==>> Get Bets
// id: 1
// gameId: 10
// game: null
// creationDate: "2020-01-24T21:02:56.864"
// conditionId: 3
// condition: null
// predictorId: 16
// predictor: null
// challengerId: 20
// challenger: null
// betAmount: 7000
// betLink: "https://hfhffgfgfg/cet/4"
// winnersId: 0
// winner: null
// loosersId: 0
// looser: null
// amountWon: 12000


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


