import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;

  constructor() { }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, {email, password});
  }
}
