import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authToken: string = '';

  constructor() { 
    // get token form storage
    this._authToken = localStorage.getItem('authToken') || '';
  }

  get authToken(): string {
    return this._authToken;
  }
  set authToken(token: string) {
    this._authToken = token;
    // save token to storage
    localStorage.setItem('authToken', token);
  }


  
}
