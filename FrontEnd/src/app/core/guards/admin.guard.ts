import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  | Promise<boolean> | boolean {
    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getRoles().find(role => role.authority == 'ROLE_ADMIN')) {
      return true;
      } else {
      this.router.navigate(['not-found']);
      return false;
      }
    } else {
      this.router.navigate(['not-found']);
      return false;
    }
  }
}
