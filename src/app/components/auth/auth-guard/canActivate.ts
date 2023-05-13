import { RouterStateSnapshot, UrlTree, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

export const canActivate = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};