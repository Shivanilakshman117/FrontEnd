import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { verifyEmployee } from '../data/verify-employee';
import { NgForm } from '@angular/forms';

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
  
  constructor(private lay:LayoutService) { }

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

  console.log(this.verifyAccountInstance.answer,
  this.verifyAccountInstance.confirmPassword,this.verifyAccountInstance.password,
  this.verifyAccountInstance.securityQuestion,this.passwordMismatchMessage
  );
}
}
