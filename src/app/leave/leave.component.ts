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
 
  dabba: '';
  leaveTypes = ['Sick Leave', 'Casual Leave', 'Privilege Leave'];
  sessions = [1, 2];
  ccToList: any = [];
  tempCCToList: any = [];
  reportingAuthoritiesList: any = [];
  tempreportingAuthoritiesList: any = [];
  balance: number = 0;
  days: number = 0;
 // moment = require('moment-business-days');
 leaveInstance:leave={
      leaveType:'Sick Leave',
      fromDate:null,
      toDate:null,
      fromSession:null,
      toSession:null,
      reason:null,
      sendTo:null,
      CCTo:null,
      days:0,
      balance:0,
      status:'Applied'
 }
  
  constructor(private dataService: DataService, private router: Router,
    private lay: LayoutService,
    private fb:FormBuilder) { }


  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();
    
    this.getccToList();
    this.getreportingAuthorities();
    
  }
onSubmit()
{
  console.log(this.leaveInstance);
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

  }

validateForSickLeave(from:Date,type:string){

  var fulldate = moment(new Date(), 'YYYY-MM-DD');
  //var fromDate=from.value;
  
  var today = moment.parseZone(fulldate).format('YYYY-MM-DD');

  if ( moment(from).isAfter(today))
  
  { 
    console.log("Cannot apply sick leave in advance!");
    //return {'advanceError':"Cannot apply sick leave in advance!"};
    return false;
  }

  else
  {
    return true;
  }


}







}
