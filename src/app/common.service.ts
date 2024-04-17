import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  readonly baseUrl = 'http://localhost:3000/';
  readonly folderPath = '/assets/';

  constructor(private http: HttpClient) {}
  generateImagePath(imageName: string): string {
    return this.folderPath + imageName;
  }

  uploadImage(imageData: FormData): Observable<any> {
    const uploadUrl = `${this.baseUrl}signup`;
    return this.http.post(uploadUrl, imageData);
  }
  AddUpdateUser(Users: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', Users);
  }
  GetAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'signup');
  }
  GetUserByID(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'signup/' + id);
  }
  DeleteUserByID(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'signup/' + id);
  }
  EditUser(id: any, updatedUserData: any): Observable<any> {
    return this.http.put(this.baseUrl + 'signup/' + id, updatedUserData);
  }
  getLatestUser(): Observable<User> {
    return this.http.get<User[]>(this.baseUrl + 'signup/').pipe(
      map(users => users[users.length - 1]) // Get the last user from the array
    );
  }
}
