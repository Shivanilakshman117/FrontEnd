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
    isManager:null,
    isAdmin:false
  };
genders = ['Male', 'Female', 'Other'];
departments = ['BD', 'BT', 'QA','IT','EDM','HR'];
designations=['CEO','COO','Head','Manager','Senior Developer','Junior Developer'];
bloodTypes=['A+','A-','B+','B-','O+','O-','AB+','AB-'];

constructor(private dataService:DataService,private lay:LayoutService) {
   
   }

  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();
  }
  onSubmit(employeeForm:NgForm)
  {
      
  this.dataService.postEmployeeForm(this.employeeInstance).subscribe(
      result=>(console.log(result)),
      error=>console.log(error)
    );
  
   console.log(this.employeeInstance.bloodType,this.employeeInstance.department,this.employeeInstance.designation,this.employeeInstance.gender);

  }
}
