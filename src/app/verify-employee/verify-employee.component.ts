import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { verifyEmployee } from '../data/verify-employee';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Route } from '@angular/compiler/src/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-employee',
  templateUrl: './verify-employee.component.html',
  styleUrls: ['./verify-employee.component.css']
})
export class VerifyEmployeeComponent implements OnInit {

  verifyAccountInstance: verifyEmployee=
  {
    password:null,
    confirmPassword:null,
    securityQuestion:null,
    answer:null
  };

postError=false;
postErrorMessage=" ";
passwordMismatch=false;
passwordMismatchMessage="nil";
postSuccess=false;
postSuccessMessage=" ";

  
  constructor(private lay:LayoutService, private dataService:DataService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.hideNav();
  
   
  }

onSubmit(verifyAccountForm:NgForm)
{  
  if(!(this.verifyAccountInstance.confirmPassword===this.verifyAccountInstance.password))
  {
    this.passwordMismatch=true;
    this.passwordMismatchMessage="Passwords do not match";
    
  }

  var id= this.route.snapshot.params.id;

  this.dataService.postForVerifyEmployee(this.verifyAccountInstance, id).subscribe(
    result=>this.onSuccess(result),
    error=>this.onHttpError(error));
}

onHttpError(errorResponse:any)
{
console.log('error: ',errorResponse);
this.postError=true;
this.postErrorMessage=errorResponse.error.error;

}
onSuccess(result:any)
{

this.postSuccess=true;
this.postSuccessMessage=result;

}
}
