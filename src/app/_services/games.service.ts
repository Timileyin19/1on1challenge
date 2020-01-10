import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addSport(sport) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'sport/create' , sport, httpOptions);
  }
  
  updateSport(sport) {
    // No API end point for it yet
  }

  getSports() {
    return this.http.get(this.baseUrl + 'sport/getall');
  }

  getSport(id) {
    return this.http.get(this.baseUrl + 'sport/get/' + id);
  }

  deleteSport(id) {
    return this.http.delete(this.baseUrl + 'sport/delete/' + id);
  }


  addLeague(league) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'league/create' , league, httpOptions);
    // return this.http.post<any[]>(this.baseUrl + 'league/create' , league);
  }

  updateLeague(id, league) {
    return this.http.put(this.baseUrl + 'league/update/' + id, league);
  }

  getLeagues() {
    return this.http.get(this.baseUrl + 'league/getall');
  }

  getLeague(id) {
    return this.http.get(this.baseUrl + 'league/get/' + id);
  }

  deleteLeague(id) {
    return this.http.delete(this.baseUrl + 'league/delete/' + id);
  }

}
