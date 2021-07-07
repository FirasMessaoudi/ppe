import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/tokenstorage.service';
 
 
const TOKEN_HEADER_KEY = 'Authorization';
const req1="/users/signin";
const req2 ="/users/signup";
const req3 ="/comments/findAll";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.url.search(req1)==-1 && req.url.search(req2)==-1 && req.url.search(req3)==-1){
        req=req.clone({
            setHeaders :{
                Authorization: `Bearer ${this.token.getToken()}`
            }
        })
    }
        return next.handle(req);
    }
}
 
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];