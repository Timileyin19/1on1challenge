import { AlertifyService } from './../_services/alertify.service';
import { GamesService } from './../_services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard-challenge',
  templateUrl: './dashboard-challenge.component.html',
  styleUrls: ['./dashboard-challenge.component.css']
})
export class DashboardChallengeComponent implements OnInit {

  // HINT: Populate the Table Using the "Bet" endpoint and if the User challenge any of the Bet, then just do an update functionality on the say "Bet" endpoint

  bets;
  challengeableBets: any[] = [];
  conditions: any[];
  currentPredictor;
  games: any[];
  jstoday = '';
  leagues: any[];
  today = new Date();
  updatedBet;
  user;
  users: any[];

  


  constructor(private route: ActivatedRoute, private gameService: GamesService, private alertify: AlertifyService, private router: Router) { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.data.subscribe(data => {
      this.bets = data['bets'];
      this.conditions = data['conditions'];
      this.games = data['games'];
      this.leagues = data['leagues'];
      this.users = data['users'];
    });

    this.challengeableBets = this.setchallengeableBets();
  }

  setchallengeableBets(): any[] {
    if(this.bets) {
      this.bets.forEach(bet => {
        if(bet.challengerId == 0 && bet.predictorId != this.user.id) {
          this.challengeableBets.push(bet);
        }
      });
    }
    return this.challengeableBets;
  }

  confirmedChallenge() {
    this.updatedBet.challengerId = this.user.id;
    // this.gameService.updateBet(this.updatedBet.id, this.updatedBet)
    //   .subscribe(res => {
    //     console.log('Update Bet response: ', res);
    //     this.alertify.success('Bet challenged successfully');
    //     setTimeout(() => { location.reload() }, 5);
    //   }, error => {
    //     console.log('Error while updating the Bet: ', error);
    //   })

    this.gameService.challengeBet(this.updatedBet.id, this.user.id)
      .subscribe(res => {
        console.log('Challenge Bet response: ', res);
        this.alertify.success('Bet challenged successfully');
        setTimeout(() => { location.reload() }, 5);
      }, error => {
        console.log('Error while updating the Bet:', error);
      });
  }

  getBetToChallenge(id) {
    if (this.bets) {
      this.bets.forEach(bet => {
        if (bet.id == id) {
          this.updatedBet = bet;
        }
      });
    }
    this.currentPredictor = this.getUserById(this.updatedBet.predictorId);
  }

  getConditionById(id) {
    var condition;
    if(this.conditions) {
      this.conditions.forEach(c => {
        if(c.id == id) {
          condition = c;
        }  
      });
    }
    return condition;
  }

  getGameById(id) {
    var game;
    if(this.games) {
      this.games.forEach(g => {
        if(g.id == id) {
          game = g;
        }  
      });
    }
    return game;
  }


  getLeagueById(id) {
    var league;
    if (this.leagues) {
      this.leagues.forEach(l => {
        if (l.id == id) {
          league = l;
        }
      });
    }
    return league;
  }

  getUserById(id) {
    var user;
    if (this.users) {
      this.users.forEach(u => {
        if(u.id == id) {
          user = u;
        }
      });
    }
    return user;
  }

  
}

// BET
// "id": 1,
// "gameId": 10,
// "game": null,
// "creationDate": "2020-01-24T21:02:56.864",
// "conditionId": 3,
// "condition": null,
// "predictorId": 16,
// "predictor": null,
// "challengerId": 20,
// "challenger": null,
// "betAmount": 7000,
// "betLink": "https://hfhffgfgfg/cet/4",
// "winnersId": 0,
// "winner": null,
// "loosersId": 0,
// "looser": null,
// "amountWon": 12000

// GAME 
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

// USER 
  // "id": 20,
  // "fullName": "Dele Taiwo",
  // "username": "taiwo12",
  // "email": "deletaiwo@gmail.com",
  // "phoneNumber": "09034231234",
  // "gender": "male",
  // "age": 18,
  // "city": "Ibadan",
  // "country": "Nigeria",
  // "creationDate": "2019-12-28T20:17:58.141137",
  // "lastActive": "2019-12-28T20:17:58.141182",
  // "activationCode": "1on1-47660415",
  // "isActivated": false,
  // "profilePicLink": null,
  // "walletAddress": "9f0bbf98-293f-4361-80c5-88af006344be",
  // "balance": 0
