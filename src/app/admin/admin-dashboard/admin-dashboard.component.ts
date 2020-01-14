import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { GamesService } from './../../_services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sports; 
  conditions: any[];
  leagues: any[];
  newSport: any = {};
  newLeague: any = {};
  newCondition: any = {};
  mySport;
  myLeague;

  constructor(private gameService: GamesService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sports = data['sports'];
    })

    // this.gameService.getSports()
    //   .subscribe( res => {
    //     this.allSports(res);
    //     this.sports = res;
    //   }, error => {
    //     console.log('Get Sports Error = ', error);
    //   })

    this.gameService.getLeagues()
      .subscribe( res => {
        this.allLeagues(res);
      }, error => {
        console.log('Get Leagues Error = ', error);
      });

    this.gameService.getConditions() 
      .subscribe( res => {
        this.allConditions(res);
      }, error => {
        console.log('Get Conditions Error = ', error);
      })
  }

  // allSports(sports) {
  //   this.sports = sports;
  // }

  addSport() {
    var sport = JSON.stringify(this.newSport)
    this.gameService.addSport(sport)
      .subscribe(() => {
        this.alertify.success('Sport Added Successfully');
        location.reload();  
      }, error => {
        this.alertify.error('Sport Failed to Add');
        console.log('Addition of Sport', error);
      });
  }

  getSport(id) {
    this.gameService.getSport(id)
      .subscribe(res => {
        this.mySport = res;
      });
  }

  updateSport() {
    this.alertify.message('Service not available');
    location.reload();
  }

  deleteSport(id) {
    this.alertify.confirm('Do you want to permanently delete this Sport?', () => {
      this.gameService.deleteSport(id)
        .subscribe(() => {
          // take the Sport away from the UI immediately
          this.sports.splice(this.sports.findIndex(s => s.id === id), 1);
          this.alertify.message('Sport deleted successfully');
        }, error => {
          this.alertify.error('Failed to Delete, please try again');
        })
    });
  }

  getSportById(id) {
    var sport, sports = this.sports;
    for (let s of sports) {
      if (s.id == id)
      sport = s;
    }
    return sport;
  }

  allLeagues(leagues) {
    this.leagues = leagues;
  }

  getLeague(id) {
    this.gameService.getLeague(id)
      .subscribe( res => {
        this.myLeague = res;
      });
  }

  addLeague() {
    var league = JSON.stringify(this.newLeague); 
    this.gameService.addLeague(league)
      .subscribe( () => {
        this.alertify.success('League Added Successfully');
      }, error => {
        this.alertify.error('Failed, Please try Again');
        console.log('Add League Error - ', error);
      });
  }

  updateLeague(id) {
    this.gameService.updateLeague(id, this.myLeague)
      .subscribe(res => {
        if (res != null)
          this.alertify.success('League Updated Successfully');

          this.alertify.message('Service Not Available, Try Later');
      }, error => {
        console.log('League Update Error - ' , error);
      })
  }

  deleteLeague(id) {
    this.alertify.confirm('Do you want to permanently delete this League?', () => {
      this.gameService.deleteLeague(id)
        .subscribe(() => {
          this.leagues.splice(this.leagues.findIndex(l => l.id == id), 1);
          this.alertify.message('League Deleted Successfully');
        }, error => {
          this.alertify.error('Failed to Delete, please try again');
        })
    });
  }

  allConditions(conditions){
    this.conditions = conditions;
  }

  addCondition() {
    var condition = JSON.stringify(this.newCondition);
    this.gameService.addCondition(condition)
      .subscribe(() => {
        this.alertify.success('Condition Added Successfully');
        location.reload();
      }, error => {
        this.alertify.error('Failed to Add Condition, Try Again');
      })
  }

  updateCondition() {
    this.alertify.message('Function not available, Try Later!');
  }

  deleteCondition(id) {
    this.alertify.confirm('Do you want to permanently delete this Condition?', () => {
      this.gameService.deleteCondition(id)
        .subscribe(() => {
          this.conditions.splice(this.conditions.findIndex(l => l.id == id), 1);
          this.alertify.message('Condition Deleted Successfully');
        }, error => {
          this.alertify.error('Failed to Delete, please try again');
        })
    });
  }

}
