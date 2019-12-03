import { Component, OnInit, ɵConsole } from '@angular/core';
import { LayoutService } from '../layout.service';
import { employee } from '../data/employee';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';

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
test = false;

constructor(private dataService:DataService,private lay:LayoutService,private router:Router) {
   
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
  {  if(employeeForm.valid)  
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

}
