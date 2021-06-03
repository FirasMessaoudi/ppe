import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';
const helper = new JwtHelperService();
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
 
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private statusSource = new BehaviorSubject<boolean>(localStorage.getItem(TOKEN_KEY) != null);
  currentStatus = this.statusSource.asObservable();
  private roles:string;
  constructor() { }
 
  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    this.statusSource.next(false);

  }
 
  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    this.statusSource.next(true);

    

  }
 
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
 
  // public saveUsername(username: string) {
  //   window.sessionStorage.removeItem(USERNAME_KEY);
  //   window.sessionStorage.setItem(USERNAME_KEY, username);
  // }
 
  public getUsername(): string {
    if(localStorage.getItem(TOKEN_KEY) != null)
    return helper.decodeToken(localStorage.getItem(TOKEN_KEY)).sub; 
   }
 
  // public saveAuthorities(authorities: string[]) {
  //   window.sessionStorage.removeItem(AUTHORITIES_KEY);
  //   window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  // }
 
  // public getAuthorities(): string {
  //   this.roles = '';
 
  //     this.roles=sessionStorage.getItem(AUTHORITIES_KEY)
 
  //   return this.roles;
  // }
  validToken(): boolean {
    if ( localStorage.getItem(TOKEN_KEY) !== null ) {

      if (!helper.isTokenExpired(localStorage.getItem(TOKEN_KEY))) {
        return true;
      } else  {
        this.signOut();
        return false; }
    } else {

      return false;
    }
  }

 

  getIsActive() {
    if(localStorage.getItem(TOKEN_KEY) != null)
      return helper.decodeToken(localStorage.getItem(TOKEN_KEY)).active;
  }

  getDecodeToken(){
    if(localStorage.getItem(TOKEN_KEY) != null)
      return helper.decodeToken(localStorage.getItem(TOKEN_KEY));
  }
}