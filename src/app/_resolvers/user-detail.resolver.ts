import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { User } from './../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable() 
export class UserDetailResolver implements Resolve<User[]> {

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    // resolve automatically subscribe to an observable by itself
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUser(route.params['id'])
            .pipe(
                    catchError(error => {
                        this.alertify.error('Problem retriving data');
                        this.router.navigate(['home']);
                        return of(null);
                    })
            );
    }
    
}