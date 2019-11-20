import { Component, OnInit } from '@angular/core';
import { forgotPassword } from '../data/forgot-password';
import { NgForm } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { DataService } from '../data/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

forgotPasswordInstance:forgotPassword=
{
  employeeId:null,
  securityQuestion:null,
  answer:null
}
postSuccess=false;
postSuccessMessage=" ";

postError=false;
postErrorMessage=" ";

  constructor(private lay:LayoutService,private dataService:DataService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.hideNav();
  }

onSubmit(forgotPasswordForm:NgForm)
{
  //console.log(this.forgotPasswordInstance.employeeId,
    //this.forgotPasswordInstance.answer,this.forgotPasswordInstance.securityQuestion);

    
  this.dataService.postForForgotPassword(this.forgotPasswordInstance).subscribe(
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
