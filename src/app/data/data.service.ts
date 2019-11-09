import { Injectable } from '@angular/core';
import { login } from './login';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  postLoginForm(loginInstance:login): Observable<any>
  {
    let body = `username=${loginInstance.username}&password=${loginInstance.password}&grant_type=${loginInstance.grant_type}`;
    return this.http.post('https://localhost:44310/token',body)
    
    //return of(loginInstance);
  }

  postEmployeeForm(employeeInstance:employee): Observable<any>
  {
    console.log(employeeInstance.isManager);
    employeeInstance.isManager='1';
    
    return this.http.post('https://localhost:44310/api/AddEmployee/newemployee',employeeInstance)
    
    //return of(loginInstance);
  }

  postForEmployeeList():Observable<any>
  {
    return this.http.post('https://localhost:44310/api/Values/GetAllEmployees',null);
  }

  postForReportingAuthoritiesList():Observable<any>
  {
    return this.http.post('https://localhost:44310/api/Values/GetReportingAuthorities',null);
  }
}
