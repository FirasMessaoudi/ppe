import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';
const helper = new JwtHelperService();
const TOKEN_KEY = 'AuthToken'; 
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private statusSource = new BehaviorSubject<boolean>(localStorage.getItem(TOKEN_KEY) != null);
  currentStatus = this.statusSource.asObservable();
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
  public getUsername(): string {
    if(localStorage.getItem(TOKEN_KEY) != null)
    return helper.decodeToken(localStorage.getItem(TOKEN_KEY)).sub; 
   }
   public getRoles(): any {
    if(localStorage.getItem(TOKEN_KEY) != null)
    return helper.decodeToken(localStorage.getItem(TOKEN_KEY)).auth; 
   }
   public isAdmin(){
    if(this.getRoles().find(role=>role.authority=='ROLE_ADMIN')){      
      return true;
      }
      return false;
   }
   public getEmail(): string {
    if(localStorage.getItem(TOKEN_KEY) != null)
    return helper.decodeToken(localStorage.getItem(TOKEN_KEY)).email; 
   }
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