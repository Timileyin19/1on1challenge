import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { GamesService } from '../_services/games.service';
import { ActivatedRoute } from '@angular/router';

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

  conditions;
  game;
  games;
  leagues;
  openGames : any[] = [];
  setConditionNamount = {
    condition: null,
    amount: 0
  };
  user;

  constructor(private gameService: GamesService, private alertify: AlertifyService, private route: ActivatedRoute) { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
   }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.data.subscribe(data => {
      this.games = data['games'];
      this.leagues = data['leagues'];
      this.conditions = data['conditions'];
    });

    this.setOpenGames();
  }

  createBet() {
    if (this.setConditionNamount.amount >= 100) {
      var bet = {
        gameId: this.game.id,
        creationDate: new Date(),
        conditionId: parseInt(this.setConditionNamount.condition),
        predictorId: this.user.id,
        challengerId: 0,
        betAmount: this.setConditionNamount.amount,
        betLink: 'https://1on1sport.netlify.com/dashboard/play/' + this.user.id + '/' + this.game.id ,
        winnersId: 0,
        loosersId: 0,
        amountWon: 0 
      };

      this.gameService.addBet(bet)
        .subscribe((res) => {
          this.alertify.success('Bet created Successfully');
          location.reload();
        }, error => {
          console.log('Error while creating Bet: ', error);
        });
    } else {
      this.alertify.message('Minimum Bet Amount is NGN100');
    }
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
    this.game = null;
    var game, games = this.games;
    for (let g of games) {
      if (g.id == id) 
        game = g; 
    }
    this.game = game;
  }

  setOpenGames() {
    if (this.games) {
      this.games.forEach(game => {
        if(game.isOpen == true) {
          this.openGames.push(game);
        }
      });
    }
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


// Data Type to Create Bet  
// "gameId": 0,
// "creationDate": "2020-04-12T14:40:54.532Z",
// "conditionId": 0,
// "predictorId": 0,
// "challengerId": 0,
// "betAmount": 0,
// "betLink": "string",
// "winnersId": 0,
// "loosersId": 0,
// "amountWon": 0

// Users id that are currently in the Db
// 16, 20, 21, 22, 23



