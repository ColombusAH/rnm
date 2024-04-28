import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authToken = signal('');
 isLoggedIn = computed(() => !!this._authToken() );


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

  login(email: string, password: string) {
    return this.authApi.login(email, password);
  }
  register(creds: { email: string, password: string, username: string }) {
    return this.authApi.register(creds);
  }

  logout() {
    this.authToken = '';
  }

}
