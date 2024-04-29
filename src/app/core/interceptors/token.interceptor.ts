import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = localStorage.getItem('authToken') || ''

  // Clone the request and add the authorization header
  const authReq = req.clone({
   
    headers: req.headers.set('authorization', `Bearer ${authToken}`)
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
