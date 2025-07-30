import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const reqHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('accessToken');

  if (token) {
    req = req.clone({
      setHeaders: { accessToken: token },
    });
  }

  return next(req);
};
