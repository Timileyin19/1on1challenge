import { UserService } from './user.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: any;
  detailedUser: any;

  constructor(private http: HttpClient, private user: UserService) { }

  login(model: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'login/', model, httpOptions)
        .pipe(
          map((response: any) => {
            const user = response;
            if (user) {
              localStorage.removeItem('admin');
              localStorage.setItem('token', user.token);
              localStorage.setItem('user', JSON.stringify(user.userDto));
              this.decodedToken = this.jwtHelper.decodeToken(user.token);
              this.currentUser = user.userDto;
            }
          })
        );
  }
  
  register(user) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'register/' , user, httpOptions);
  }

  activateEmail(code) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.put<any[]>(this.baseUrl + 'activate/' + this.currentUser.id + '/activationCode/' + code, httpOptions);

    // /api/Auth/activate/{userid}/ActivationCode/{code}
  }

  
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  adminLoggedIn() {
    const admin = JSON.parse(localStorage.getItem('admin'));
    return admin == true ? true : false;
  }
}
