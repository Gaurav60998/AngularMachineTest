import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  AddUpdateUser(Users: any): Observable<any> {
    return this.http.post(this.url + 'signup', Users);
  }
  GetAllUsers(): Observable<any> {
    return this.http.get(this.url + 'signup');
  }
  GetUserByID(id: any): Observable<any> {
    return this.http.get(this.url + 'signup/' + id);
  }
  DeleteUserByID(id: any): Observable<any> {
    return this.http.delete(this.url + 'signup/' + id);
  }
  EditUser(id: any, updatedUserData: any): Observable<any> {
    return this.http.put(this.url + 'signup/' + id, updatedUserData);
  }
}
