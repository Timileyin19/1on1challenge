import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
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

  bets;
  games;
  leagues;
  sports;
  user;
  userGames: any[] = [];
  users;




  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { 
    this.jstoday = formatDate(this.today, 'MMM d, y', 'en-US');
  }

  ngOnInit() {
    // Football	Premier League	Liverpool : Arsenal	Predictor	John19	Won
    
    // SPORTS, LEAGUES, GAMES, USERS, BETS, 
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.data.subscribe(data => {
      this.bets = data['bets'];
      this.games = data['games'];
      this.leagues = data['leagues'];
      this.sports = data['sports'];
      this.users = data['users'];
    });

    this.userGames = this.setParticularUserGames();

  }

  deleteBetFromHistory() {
    this.alertify.message('Service not available');
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
  

  getSportById(id) {
    var sport; 
    if (this.sports) {
      this.sports.forEach(s => {
        if (s.id == id) {
          sport = s;
        }
      });
    }
    return  sport;
  }


  getOtherUserById(predictorId, challengerId) {
    
    if (this.users) {
      // Meaning the logged-in User is the Predictor 
      if (this.user.id == predictorId) {
        var user;
        // the Competitor will be the Challenger 
        this.users.forEach(u => {
          if (u.id == challengerId) {
            user = u;
          }
        });
        return user;
      }

      var user1;
      // Edge Case: The Logged-in User is the Challenger
      this.users.forEach(u => {
        if (u.id == predictorId) {
          user1 = u;
        }
      });
      return user1;
    }
  }
dash

  setParticularUserGames(): any[] {
    var userGames: any[] = [];
    var inCompleteGame: any[] = [];
    if (this.bets) {
      this.bets.forEach(bet => {
        if (bet.predictorId == this.user.id || bet.challengerId == this.user.id) {
          if (!(bet.predictorId == 0 || bet.challengerId == 0 )) {
            userGames.push(bet);
          }
        }
      });
    }
    // console.log('Incomplete Games', inCompleteGame);
    return userGames; 
  }

  setStatus(winnerId) {
    // won or loss or undecided
    if (this.user.id == winnerId) {
      return 'Won';
    } else if (this.user.id != winnerId && winnerId != 0) {
      return 'Loss';
    } else if (winnerId == 0) {
      return 'Undecided';
    } else {
      return 'Unhandled Exception';
    }
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
