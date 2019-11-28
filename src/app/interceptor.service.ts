import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import {Observable,of, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor  {

  constructor(public auth: AuthenticationService,private router:Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `bearer ${this.auth.getToken()}`
      }
     
    });

    return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
  
    if (err.status === 401 || err.status === 403) {
      
        this.router.navigate(['/error-page']);
    
        return of(err.message); 
    }
    return throwError(err);
}
}
