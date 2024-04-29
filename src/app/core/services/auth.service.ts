import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AuthApiService } from '../apis/auth-api.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authToken = signal(localStorage.getItem('authToken') || '');
 isLoggedIn = computed(() => !!this._authToken() );


  authApi = inject(AuthApiService);

  constructor() { 
      this.authApi.checkToken().subscribe({
        next: () => {
          const token = localStorage.getItem('authToken');
          this.authToken = token || '';
        },
        error: (e) => {
          this.authToken = '';
        }
      });
    
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
    return this.authApi.login(email, password).pipe(tap(({token}) => {
      this.authToken = token;
    }));
  }
  register(creds: { email: string, password: string, username: string }) {
    return this.authApi.register(creds);
  }

  logout() {
    this.authToken = '';
  }

}
