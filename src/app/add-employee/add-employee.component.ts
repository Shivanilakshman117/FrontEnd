import { Component, OnInit, ɵConsole } from '@angular/core';
import { LayoutService } from '../layout.service';
import { employee } from '../data/employee';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../data/validator.service';

const moment = require('moment-business-days');
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

    employeeInstance:employee={
    name:null,
    gender:null,
    email:null,
    mobile:null,
    dob:null,
    doj:null,
    department:null,
    designation:null,

    address:null,
    bloodType:null,
    isManager:"0",
    isAdmin:"0",
    managerName:null,
  };
isManagerChecked:any=true;
manager:string;
isAdminChecked:any=true;
managersList: any = [];
isHidden=true;
genders = ['Male', 'Female', 'Other'];
departments = ['BD', 'BT', 'QA','IT','EDM','HR'];
designations=['CEO','COO','Head','Manager','Senior Developer','Junior Developer'];
bloodTypes=['A+','A-','B+','B-','O+','O-','AB+','AB-'];
tempManagersList:any=[];
postError=false;
postErrorMessage="Unable to connect to server";
postMessage='';
messageStatus=false;
today = new Date();
formErrormessage='';
emailErrormessage='';

emailError:boolean=false;
emailErrorMessage='';
mobileError:boolean=false;
mobileErrorMessage='';
dobError:boolean=false;
dobErrorMessage='';
dojError:boolean=false;
dojErrorMessage='';
isFormValid:boolean=true;

constructor(private dataService:DataService,private lay:LayoutService,private router:Router,private val:ValidatorService) {
   
   }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();
    this.getManagersList();
  }

onHttpError(errorResponse:any)
{
console.log('error: ',errorResponse);
this.postError=true;
this.postErrorMessage="Unable to connect to server";
}

PostMessage(message:string)
{
  this.messageStatus=true;
  this.postMessage=message;
}
  onSubmit(employeeForm:NgForm)
  {  
    this.val.validateForm(this.employeeInstance);
    this.FormErrors();

  
    if(employeeForm.valid && this.val.isFormValid)  
    { this.employeeInstance.isManager= this.isManagerChecked ? "0":"1";
 
      this.employeeInstance.isAdmin=this.isAdminChecked ? "0":"1";

      this.dataService.postEmployeeForm(this.employeeInstance).subscribe(
      result=>(this.PostMessage(result)),
      error=>this.onHttpError(error)
    );
    
      }

 }
 onCheckManager(e) {

  this.isManagerChecked=e.checked;
 this.addManager(e);
  
}
onCheckAdmin(e) {
  this.isAdminChecked=e.checked; 
}

  addManager(e)
  {if(e.checked){        

    this.isHidden=false;
   }
 else 
 {
  this.isHidden=true;
 
 }
  }

  getManagersList() {

    this.dataService.postForManagersList().subscribe(
      (result: any) => {
        (result.forEach(element => {
          this.tempManagersList.push(element);
        }),
          error => console.log(error)
        )
      }
    );
    this.managersList = this.tempManagersList;

  }
  FormErrors()
  {
    this.emailErrorMessage=this.val.emailErrorMessage;
    this.emailError=this.val.emailError;
    this.mobileError=this.val.mobileError;
    this.mobileErrorMessage=this.val.mobileErrorMessage;
    this.dobError=this.val.dobError;
    this.dobErrorMessage=this.val.dobErrorMessage;
    this.dojError=this.val.dojError;
    this.dojErrorMessage=this.val.dojErrorMessage;
  }


}
