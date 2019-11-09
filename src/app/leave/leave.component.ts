import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';
import { leave } from '../data/leave';
import { NgForm, AbstractControl } from '@angular/forms';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

const moment = require('moment');


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
 
  
  leaveTypes = ['Sick Leave', 'Casual Leave', 'Privilege Leave'];
  sessions = [1, 2];
  ccToList: any = [];
  tempCCToList: any = [];
  reportingAuthoritiesList: any = [];
  tempreportingAuthoritiesList: any = [];
  balance: number = 0;
  days: number = 0;
 // moment = require('moment-business-days');
  fromDateError = "";
  /*leaveApplication: leave =
    {
      leaveType: null,
      fromDate: null,
      toDate: null,
      fromSession: null,
      toSession: null,
      CCTo: null,
      sendTo: null,
      reason: null,
      status: "Applied"
    }
*/
    leaveForm:FormGroup;

  constructor(private dataService: DataService, private router: Router,
    private lay: LayoutService,
    private fb:FormBuilder) { }


  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();
    this.leaveForm= this.fb.group(
      {
        leaveType:['Sick Leave'],
        fromDate:['',[Validators.required,this.validateFromDate]],
        toDate:['',Validators.required],
        fromSession:['',Validators.required],
        toSession:['',Validators.required],
        reason:['',Validators.required],
        sendTo:['',Validators.required],
        CCTo:[''],
        days:[0],
        balance:[0],
    });
  }
 
  getccToList() {

    this.dataService.postForEmployeeList().subscribe(
      (result: any) => {
        (result.forEach(element => {
          this.tempCCToList.push(element);
        }),
          error => console.log(error)
        )
      }
    );
    this.ccToList = this.tempCCToList;

  }


  blurccToList() {
    this.tempCCToList = [];
  }

  getreportingAuthorities() {
    this.dataService.postForReportingAuthoritiesList().subscribe(
      (result: any) => {
        (result.forEach(element => {
          this.tempreportingAuthoritiesList.push(element);
        }),
          error => console.log(error)
        )
      }
    );
    this.reportingAuthoritiesList = this.tempreportingAuthoritiesList;
    console.log(this.reportingAuthoritiesList);
  }



  blurreportingAuthoritiesList() {
    this.tempreportingAuthoritiesList = [];
  }

onSubmit()
{
  console.log(this.leaveForm.value);
  
}

validateFromDate(control:AbstractControl):{[key:string]:any}| null{
  
  /*var fromDate= control.value;
  var fulldate = this.moment(new Date(), 'YYYY-MM-DD');
  var today = this.moment.parseZone(fulldate).format('YYYY-MM-DD');
  if (this.moment(fromDate).isAfter(today))
  
  {
    return {'Cannot apply sick leave in advance!':true}
  }

  else
  {
    return null;
  }*/
  console.log(moment());
return null;
}
}
