import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  public getToken(): string {
    return localStorage.getItem('token');
  }

}
