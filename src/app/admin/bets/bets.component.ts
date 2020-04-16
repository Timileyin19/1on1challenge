import { AlertifyService } from './../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GamesService } from 'src/app/_services/games.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  // display all Bets and allow the Admin to set the Winner (then the Looser should be set automatically)
  // I need BETS, USERS, GAMES, CONDITIONS

  tableColumns  :  string[] = ['game', 'gameTime', 'predictor', 'challenger', 'condition', 'betAmount', 'winner', 'amountWon', 'setWinner'];
  
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

      // this.setWinnerForm.game = this.getGameById(bet.gameId);
      // this.setWinnerForm.condition = this.getConditionById(bet.conditionId);
      // this.setWinnerForm.predictor = this.getUserById(bet.predictorId);
      // this.setWinnerForm.predictorId = bet.predictorId;
      // this.setWinnerForm.challenger = this.getUserById(bet.challengerId);
      // this.setWinnerForm.challengerId = bet.challengerId;
      // this.setWinnerForm.winnerId = 0;

  bets: any[];
  conditions: any[];

  game;
  challenger;
  condition;
  predictor;

  games: any[];
  searchKey: string;
  setWinnerForm = {
    betId: 0,
    game: null,
    condition: null,
    predictor: null,
    predictorId: 0,
    challenger: null,
    challengerId: 0,
    winner: '',
    winnerId: 0
  };
  // setWinnerForm = {};
  users: any[];
  winner: string;

  constructor(private alertify: AlertifyService, private gameService: GamesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.bets = data['bets'];
      this.conditions = data['conditions'];
      this.games = data['games'];
      this.users = data['users'];
    });

    this.dataSource = new MatTableDataSource(this.bets);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getBetById(id) {
    var bet;
    if (this.bets) {
      this.bets.forEach(b => {
        if (b.id == id) {
          bet = b;
        }
      });
    }
    return bet;
  }

  getConditionById(id) {
    var condition;
    if (this.conditions) {
      this.conditions.forEach(c => {
        if (c.id == id) {
          condition = c;
        }
      });
    }
    return condition;
  }

  getGameById(id) {
    var game;
    if (this.games) {
      this.games.forEach(g => {
        if (g.id == id) {
          game = g;
        }
      });
    }
    return game;
  }

  getUserById(id) {
      if (id != 0) {
        var user;
      if (this.users) {
        this.users.forEach(u => {
          if (u.id == id) {
            user = u;
          }
        });
      }
      return user;
    }

    return false;
  }

  setFormUp(bet) {
    // Readonly: Game (both Team), Condition, Predictor and Challenger
    //             NotReadOnly: Set Winner (need PredictorId and the ChallegerId) 
    if (bet) {
      this.setWinnerForm.betId = bet.id;
      this.setWinnerForm.game = this.getGameById(bet.gameId);
      this.setWinnerForm.condition = this.getConditionById(bet.conditionId);
      this.setWinnerForm.predictor = this.getUserById(bet.predictorId);
      this.setWinnerForm.predictorId = bet.predictorId;
      this.setWinnerForm.challenger = this.getUserById(bet.challengerId);
      this.setWinnerForm.challengerId = bet.challengerId;
      // this.setWinnerForm.winnerId = 0;
      // console.log(this.setWinnerForm);
      this.game = this.setWinnerForm.game;
      this.challenger = this.setWinnerForm.challenger;
      this.predictor = this.setWinnerForm.predictor;
      this.condition = this.setWinnerForm.condition;   
    }
  }

  setWinner() {
    var betId = this.setWinnerForm.betId;
    let winnerId = this.setWinnerId(this.winner);

    var bet = this.getBetById(betId);
    // console.log('Before', bet);
    bet.winnersId = winnerId;

    // console.log('After', bet);

    this.gameService.setBetWinner(betId, winnerId)
      .subscribe(res => {
        if (res == null) {
        this.alertify.message('Not Working for Now');
      } else {
        this.alertify.success('Bet Winner set successfully');
      }
      location.reload();
      }, error => {
        this.alertify.message('Failed, please try again');
        console.log('Error whlile setting Bet winner: ', error);
      });
  }

  setWinnerId(winner) {
    if (winner == 'predictor') {
      var predictorId = this.setWinnerForm.predictorId;
      return predictorId;
    } else if (winner == 'challenger') {
      var challengerId = this.setWinnerForm.challengerId;
      return challengerId;
    } else {
      return 0;
    }
  }

}


// BETS
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
