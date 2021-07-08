import { HttpErrorResponse, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/tokenstorage.service';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'; 
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';
const req1="/users/signin";
const req2 ="/users/signup";
const req3 ="/comments/findAll";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService, private router: Router) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.search(req1)==-1 && req.url.search(req2)==-1 && req.url.search(req3)==-1){
        req=req.clone({
            setHeaders :{
                Authorization: `Bearer ${this.token.getToken()}`
            }
        })
    }
        return next.handle(req);
        // .pipe(
        //     catchError((err: HttpErrorResponse) =>{
        //         console.log(err);
        //         console.log(err.headers);
                
        //         console.log(err.headers.get('Message'));
                
        //      if(err.headers.get('Message')=='Invalid token'){
        //          console.log('invalid token');
                 
        //         this.token.signOut();
        //         this.router.navigate(['/home']);
        //      }
        //      return throwError('Invalid Token');

        //     })
        // )
    }
}
 
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];