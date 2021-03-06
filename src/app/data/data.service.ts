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
import { leave } from './leave';
import { approveLeaves } from './approveLeaves';


@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  
  constructor(private http:HttpClient,private route: ActivatedRoute) { }
  
  postLoginForm(loginInstance:login): Observable<any>
  {
    
    let body = `username=${loginInstance.username}&password=${loginInstance.password}&grant_type=${loginInstance.grant_type}`;

    return this.http.post('https://localhost:8080/token',body)
    
    //return of(loginInstance);
  }

  getUserDetails()
  {
    return this.http.get('https://localhost:8080/api/login/authenticate');
  }

  postEmployeeForm(employeeInstance:employee): Observable<any>
  {
    
    return this.http.post('https://localhost:8080/api/AddEmployee/newemployee',employeeInstance)
    
    //return of(loginInstance);
  }

  postForEmployeeList():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/GetAllEmployees',null);
  }
  postForCCToList():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/GetCCToList',null);
  }


  postForReportingAuthoritiesList():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/GetReportingAuthorities',null);
  }

  getHolidaysList():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/GetHolidaysList',null);
  }
  postForManagersList():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/GetManagersList',null)
  }
  postForVerifyEmployee(verifyEmployeeInstance:verifyEmployee, id:string):Observable<any>
  {  
    let body = `password=${verifyEmployeeInstance.password}&securityQuestion=
    ${verifyEmployeeInstance.securityQuestion}&answer=${verifyEmployeeInstance.answer}`;
    let t= id.toString();
    let url='https://localhost:8080/api/AddEmployee/newemployee/VerifyAccount/'.concat(t);
    return this.http.post(url,verifyEmployeeInstance);
    
    
  }

  postForForgotPassword(forgotPasswordInstance:forgotPassword):Observable<any>
  {  let url="https://localhost:8080/api/login/forgotpassword";
    return this.http.post(url, forgotPasswordInstance);
    
    
  }
  getCurrentLeaves():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/leavebalance',null);
  }

  postLeaveApplication(application:leave)
  {
    console.log(application);
    return this.http.post('https://localhost:8080/api/Leave/ApplyLeave',application);
  }

  getAttendance()
  {
    return this.http.post('https://localhost:8080/api/Values/GetAttendance',null);
  }
  getApplications()
  {
    return this.http.post('https://localhost:8080/api/Values/ApproveLeave',null);
  }
  postLeaveStatus(approveleaveInstance:approveLeaves)
  {

    return this.http.post('https://localhost:8080/api/values/changeStatus',approveleaveInstance)
    
  }
  getSecurityQuestions():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/securityQuestion',null);
  }
  getMyLeaves():Observable<any>
  {
    return this.http.post('https://localhost:8080/api/Values/TrackLeave',null);
  }

  getMySecurityQuestion(id:string)
  {
    let t= id.toString();
    return this.http.get('https://localhost:8080/api/Values/getMySecurityQuestion/'.concat(t));
  }

}
