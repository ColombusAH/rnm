import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  constructor() { }

  login(email: string, password: string): Observable<{token:string}> {
    return this.http.post(`${this.baseUrl}/auth/login`, {email, password}) as Observable<{token:string}>;
  }

  register(creds: { email: string, password: string, username: string }) {
    return this.http.post(`${this.baseUrl}/auth/signup`, creds);
  }

  checkToken() {
    return this.http.get(`${this.baseUrl}/me`);
  }
}
