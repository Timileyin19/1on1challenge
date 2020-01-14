import { AlertifyService } from './../../_services/alertify.service';
import { GamesService } from './../../_services/games.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any[];
  sports;
  leagues;
  game: any = {};
  myGame;

  constructor(private gameService: GamesService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.games = data['games'];
      this.sports = data['sports'];
      this.leagues = data['leagues'];
    });

  }

  getSportById(id) {
    var sport, sports = this.sports;
    for (let s of sports) {
      if ( s.id == id )
        sport = s;
    }
      return sport
  }

  getLeagueById(id) {
    var league, leagues = this.leagues;
    for (let l of leagues) {
      if (l.id == id)
        league = l;
    }
    return league;
  }

  addGame() {
    var game = JSON.stringify(this.game);
    this.gameService.addGame(game)
      .subscribe(res => {
        this.alertify.success('Game Created Successfully');
        location.reload();
      }, error => {
        this.alertify.error('Game Creation Failed');
        console.log('Game Creation Error', error);
      });
  }

  getGame(id) {
    this.gameService.getGame(id)
      .subscribe(res => {
        this.myGame = res;
        console.log(this.myGame, res);
      }, error => {
        this.alertify.error('Game Fetching Failed');
        console.log('Get Game Error', error);
      })
  }

  updateGame() {
    this.gameService.updateGame(this.myGame.id, this.myGame)
      .subscribe(res => {
        console.log('Response of Game Update', res);
        this.alertify.success('Game Updated Successfully');
        location.reload();
      }, error => {
        this.alertify.error('Game Update Failed, please try again later');
        console.log('Game Update Error => ', error);
      })
  }

  deleteGame() {
    this.alertify.message('Function not available for now, Try Later!')
  }

}

// {
//   "id": 1,
//   "aTeam": "Real Madrid",
//   "bTeam": "Barcelona",
//   "description": "Champions League Semi-Final",
//   "startTime": "2019-12-29T14:01:05.061",
//   "betStartTime": "2019-12-29T14:01:05.061",
//   "betEndTime": "2019-12-29T14:01:05.061",
//   "isOpen": true,
//   "sport": null,
//   "league": null,
//   "sportId": 2,
//   "leagueId": 2
// }
