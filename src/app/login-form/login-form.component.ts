import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { login } from '../data/login';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../layouts/footer/footer.component';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

loginInstance:login =
{
  username:null,
  password:null,
  grant_type:'password'

};
postError=false;
postErrorMessage=" ";
  constructor(private dataService:DataService, private router: Router,private lay:LayoutService) { }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.hideNav();
  }

onHttpError(errorResponse:any)
{
console.log('error: ',errorResponse);
this.postError=true;
this.postErrorMessage=errorResponse.error.error;

}
onSubmit(loginForm:NgForm)
{

this.dataService.postLoginForm(this.loginInstance).subscribe(
  result=>this.router.navigate(['/add-employee']),
  error=>this.onHttpError(error)
  
);
}

redirect() {
  this.router.navigate(['/forgot-password']);
}
}
