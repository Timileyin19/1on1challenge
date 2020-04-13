import { GamesService } from './../_services/games.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { User } from './../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable() 
export class AllSportsResolver implements Resolve<any[]> {

    constructor(private gameService: GamesService, private router: Router, private alertify: AlertifyService) {}

    // resolve automatically subscribe to an observable by itself
    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.gameService.getSports()
            .pipe(
                    catchError(error => {
                        this.alertify.error('Poor Network Strength');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
            );
    }
    
}