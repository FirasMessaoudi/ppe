import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from 'src/app/core/domain/ilogin';
import { IUser } from 'src/app/core/domain/iuser';
import { JwtResponse } from 'src/app/core/domain/jwtrespons';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.myBaseUrl;
  private loginUrl = this.baseUrl + '/users/signin';
  private signupUrl = this.baseUrl + '/users/signup';

  constructor(private http: HttpClient) {
  }

  // JwtResponse(accessToken,type,username,authorities)
  attemptAuth(credentials: ILogin): Observable<JwtResponse> {
    return this.http.post<any>(this.loginUrl, credentials, httpOptions);
  }

  // SignUpInfo(name,username,email,role,password)
  signUp(info: IUser): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.signupUrl, info, httpOptions);
  }
}
