import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addBet(bet) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'bet/create' , bet, httpOptions);
  }

  challengeBet(betId, challengerId) {
    return this.http.put(this.baseUrl + 'bet/chellengebet/' + betId + '/challengerId/' + challengerId, {} ); 
  }

  updateBet(id, bet) {
    return this.http.put(this.baseUrl + 'bet/update/' + id, bet);
  }

  getBets() {
    return this.http.get(this.baseUrl + 'bet/getallbet');
  }

  getBet(id) {
    return this.http.get(this.baseUrl + 'bet/getbet/' + id);
  }

  // /api/Bet/setwinner/{id}/winner/{winnerId}
  setBetWinner(betId, winnerId) {
    return this.http.put(this.baseUrl + 'bet/setwinner/' + betId + '/winner/' + winnerId, {});
  }

  deleteBet(id) {
    return this.http.delete(this.baseUrl + 'game/delete/' + id);
  }

  addGame(game) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'game/create' , game, httpOptions);
  }

  updateGame(id, game) {
    return this.http.put(this.baseUrl + 'game/update/' + id, game);
  }

  getGames() {
    return this.http.get(this.baseUrl + 'game/getallgames');
  }

  getGame(id) {
    return this.http.get(this.baseUrl + 'game/getgame/' + id);
  }

  deleteGame(id) {
    return this.http.delete(this.baseUrl + 'game/delete/' + id);
  }

  addSport(sport) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'sport/create' , sport, httpOptions);
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


  addCondition(condition) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    return this.http.post<any[]>(this.baseUrl + 'condition/create' , condition, httpOptions);
  }

  getConditions() {
    return this.http.get(this.baseUrl + 'condition/getall');
  }


  deleteCondition(id) {
    return this.http.delete(this.baseUrl + 'condition/delete/' + id);
  }

}
