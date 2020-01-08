import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSports() {
    return this.http.get(this.baseUrl + '');
  }
}
