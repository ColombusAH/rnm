import { inject, Injectable, Signal, signal } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authToken = signal('');

  authApi = inject(AuthApiService);

  constructor() { 
    // get token form storage
    this._authToken.update(() => localStorage.getItem('authToken') || '');
  }

  get authToken(): Signal<string> {
    return this._authToken.asReadonly();
  }
  set authToken(token: string) {
    this._authToken.update(() => token);
    // save token to storage
    localStorage.setItem('authToken', token);
  }

  get isLoggedIn() {
    return !!this.authToken()
  }


  login(email: string, password: string) {
    return this.authApi.login(email, password);
  }

  logout() {
    this.authToken = '';
  }

}
