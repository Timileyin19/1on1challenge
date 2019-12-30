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

  getUser(id: number) {
    return this.http.get(this.baseUrl + id);
  }

  updateUser(userToUpdate) {
    return this.http.put(this.baseUrl + 'update/' + userToUpdate.id, userToUpdate);
  }

  deleteUser(userId) {
    return this.http.delete(this.baseUrl + 'delete/' + userId);
  }
}
