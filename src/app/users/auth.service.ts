import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _user: User;
  _token: string;

  constructor(private http: HttpClient) { }

  public get user(): User{
    if(this._user != null){
      return this._user;
    } else if(this._user == null && sessionStorage.getItem('user')){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token')){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any>{
    const credentials = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credentials});

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    console.log(params.toString());
    return this.http.post('http://localhost:8080/oauth/token', params.toString(), {headers: httpHeaders})
  }

  saveUser(accessToken: string): void {
    let payload = this.getTokenInformation(accessToken);
    this._user = new User();
    this._user.username = payload.firstName;
    this._user.lastName = payload.lastName;
    this._user.email = payload.email;
    this._user.roles = payload.authorities
    sessionStorage.setItem('user', JSON.stringify(this._user));

  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getTokenInformation(accessToekn: string): any{
    if(accessToekn != null){
      return JSON.parse(atob(accessToekn.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.getTokenInformation(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean{
    if(this.user.roles.includes(role)){
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
