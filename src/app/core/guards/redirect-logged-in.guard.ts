import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authService } from '../../services/auth.service';
import { map, tap } from 'rxjs';

export const redirectLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _authService = inject(authService);
  const loggedIn$ = _authService.loggedIn$;

  return loggedIn$.pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['/menu']);

        return false;
      }
      return true;
    })
  );
};
