import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'

const storageKey = 'ng-base';

@Injectable()
export class AuthService {
  private credentials: any = JSON.parse(sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey));

  constructor(private http: Http) { }

  signup(data: any) {
    return this.http.post(`${environment.apiUrl}/api/auth/signup`, data)
    .map((response: Response) => this.setCredentials(response));
  }

  login(email: string, password: string, remember: boolean) {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, {
      email: email,
      password: password
    }).map((response: Response) => this.setCredentials(response, remember));
  }

  logout() {
    sessionStorage.removeItem(storageKey);
    localStorage.removeItem(storageKey);
    this.credentials = null;
  }

  isAuthenticated() {
    return !!this.credentials;
  }

  setCredentials(response: Response, remember?:boolean) {
    let credentials = response.json();
    if(credentials && credentials.token){
      this.credentials = credentials;
      let storage = remember ? localStorage : sessionStorage;
      storage.setItem(storageKey, JSON.stringify(credentials));
      return true;
    }
    return false;
  }

  getCredentials() {
    return this.credentials;
  }

}
