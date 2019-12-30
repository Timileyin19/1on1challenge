import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string = environment.apiUrl + 'user/';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.baseUrl + 'getallusers');
  }
}
