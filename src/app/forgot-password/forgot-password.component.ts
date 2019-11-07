import { Component, OnInit } from '@angular/core';
import { forgotPassword } from '../data/forgot-password';
import { NgForm } from '@angular/forms';
import { LayoutService } from '../layout.service';

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

  constructor(private lay:LayoutService) { }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.hideNav();
  }

onSubmit(forgotPasswordForm:NgForm)
{
  console.log(this.forgotPasswordInstance.employeeId,
    this.forgotPasswordInstance.answer,this.forgotPasswordInstance.securityQuestion);
}
}
