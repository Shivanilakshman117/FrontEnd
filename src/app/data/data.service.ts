import { Injectable } from '@angular/core';
import { login } from './login';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { employee } from './employee';
import { Holidays } from './holidays';
import { verifyEmployee } from './verify-employee';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { forgotPassword } from './forgot-password';
import { user } from './user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http:HttpClient,private route: ActivatedRoute) { }
  
  postLoginForm(loginInstance:login): Observable<any>
  {
    
    let body = `username=${loginInstance.username}&password=${loginInstance.password}&grant_type=${loginInstance.grant_type}`;

    return this.http.post('https://localhost:44310/token',body)
    
    //return of(loginInstance);
  }

  postEmployeeForm(employeeInstance:employee): Observable<any>
  {
    
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

  getHolidaysList():Observable<any>
  {
    return this.http.post('https://localhost:44310/api/Values/GetHolidaysList',null);
  }
  postForManagersList():Observable<any>
  {
    return this.http.post('https://localhost:44310/api/Values/GetManagersList',null)
  }
  postForVerifyEmployee(verifyEmployeeInstance:verifyEmployee, id:string):Observable<any>
  {  
    let body = `password=${verifyEmployeeInstance.password}&securityQuestion=
    ${verifyEmployeeInstance.securityQuestion}&answer=${verifyEmployeeInstance.answer}`;
    let t= id.toString();
    let url='https://localhost:44310/api/AddEmployee/newemployee/VerifyAccount/'.concat(t);
   
    console.log(url);

    return this.http.post(url,verifyEmployeeInstance);
    
    
  }

  postForForgotPassword(forgotPasswordInstance:forgotPassword):Observable<any>
  {  let url="https://localhost:44310/api/login/forgotpassword";
    return this.http.post(url, forgotPasswordInstance);
    
    
  }
  getCurrentLeaves(u:user):Observable<any>
  {
    return this.http.post('https://localhost:44310/api/Values/leavebalance',u);
  }
}
