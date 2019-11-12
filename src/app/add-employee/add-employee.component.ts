import { Component, OnInit, ɵConsole } from '@angular/core';
import { LayoutService } from '../layout.service';
import { employee } from '../data/employee';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';

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
    reportingManager:null,
    address:null,
    bloodType:null,
    isManager:"0",
    isAdmin:false
  };
manager:string;
managersList: any = [];
isHidden=true;
genders = ['Male', 'Female', 'Other'];
departments = ['BD', 'BT', 'QA','IT','EDM','HR'];
designations=['CEO','COO','Head','Manager','Senior Developer','Junior Developer'];
bloodTypes=['A+','A-','B+','B-','O+','O-','AB+','AB-'];
tempManagersList:any=[];
postError=false;
postErrorMessage=" ";
postMessage='';
messageStatus=false;
today = new Date();
constructor(private dataService:DataService,private lay:LayoutService) {
   
   }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();
  }

onHttpError(errorResponse:any)
{
console.log('error: ',errorResponse);
this.postError=true;
this.postErrorMessage=errorResponse.error.error;


}

PostMessage(message:string)
{
  this.messageStatus=true;
  this.postMessage=message;
}
  onSubmit(employeeForm:NgForm)
  {
    if(employeeForm.valid)  
    {
      this.dataService.postEmployeeForm(this.employeeInstance).subscribe(
      result=>(this.PostMessage(result)),
      error=>this.onHttpError(error)
    );
    console.log("valid");
      }
      else
      {console.log("invalid");
    }
 }


  addManager(e)
  {if(e.checked){        

    this.isHidden=false;
    this.employeeInstance.isManager="0";

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
      console.log(this.managersList);
  }
  blurManagersList() {
    this.tempManagersList = [];
  }
}
