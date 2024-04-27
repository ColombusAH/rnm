import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const authToken = authService.authToken();

  // Clone the request and add the authorization header
  const authReq = req.clone({
   
    headers: req.headers.set('authorization', `Bearer ${authToken}`)
  });
  console.log('authReq', authToken);

  if(req.url.includes('auth/login')) {
    // If the request is a login request, don't add the authorization header
    return next(authReq).pipe(tap((res: any) => {
      if (!res.body) {
        return;
      }
      const token = res.body.token;
      authService.authToken = token;
    }));
  }

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
