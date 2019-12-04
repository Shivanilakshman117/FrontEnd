import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';
import { leave } from '../data/leave';
import { NgForm, AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { user } from '../data/user';
import { balanceLeaves } from '../data/balanceLeaves';

const moment = require('moment-business-days');


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {


  leaveTypes = ['Sick Leave', 'Casual Leave', 'Privilege Leave'];
  leaveId=[1,2,3];
  sessions = [1, 2];
  ccToList: any = [];
  tempCCToList: any = [];
  reportingAuthoritiesList: any = [];
  tempreportingAuthoritiesList: any = [];
  balance: number = 0;
  days: number = 0;
  // moment = require('moment-business-days');
  leaveInstance: leave = {
    leaveType: 'Sick Leave',
    fromDate: null,
    toDate: null,
    fromSession: null,
    toSession: null,
    reason: null,
    sendTo: null,
    CCTo: null,
    days: 0,
    balance: 0,
    status: 'Applied',
    leaveId:1,
    employeeId:" "
  }
 
  holidaysList: any[];
  currentLeaves: any[];
  sickLeaveError = false;
  sickLeaveMessage = '';

  advanceError=false;
  advanceMessage='';

  eligibleError=false;
  eligibleMessage='';

  postError=false;
postErrorMessage=" ";
postMessage='';
messageStatus=false;

  constructor(private dataService: DataService, private router: Router,
    private lay: LayoutService) { }


  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();

    this.getccToList();
    this.getreportingAuthorities();
    this.getHolidaysList();
    this.updateHolidaysList();
    this.getBalance();

   
  }

  onSubmit(leaveForm: NgForm) {

    var sick= this.validateForSickLeave(this.leaveInstance.fromDate, this.leaveInstance.leaveType);

    if (sick) {
      this.sickLeaveError = true;
      this.sickLeaveMessage = "Cannot apply sick leave in advance!";
   
    }
    else {
      this.sickLeaveError = false;
    }
    var advance=this.validateDates(this.leaveInstance.fromDate, this.leaveInstance.toDate);
    if(advance)
    {
      this.advanceError=true;
      this.advanceMessage="From date cannot be greater than to date!"
    }

    else{
      this.advanceError=false;
    }

    this.getLeaveDays(this.leaveInstance);
    if(!this.isEligibleToApply())
    {
      this.eligibleError=true;
      this.eligibleMessage="Insufficient balance! Cannot apply this leave!";
    }
    else
    {
      this.eligibleError=false;
    }
    this.leaveInstance.days=this.days;
  this.leaveInstance.balance=this.balance;
  this.getLeaveId(this.leaveInstance.leaveType);
  if(leaveForm.valid&&!this.eligibleError&&!this.advanceError&&!this.sickLeaveError)  
  {
    this.dataService.postLeaveApplication(this.leaveInstance).subscribe(
    result=>(this.PostMessage(result)),
    error=>this.onHttpError(error)
  );

  }
 
  }
  getccToList() {



    this.dataService.postForCCToList().subscribe(
      (result: any) => {
        (result.forEach(element => {
          this.tempCCToList.push(element);
        }),
          error => console.log(error)
        )
      }
    );
    this.ccToList = this.tempCCToList;
    console.log(this.ccToList);

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

  validateForSickLeave(from: Date, type: string) {

    var fulldate = moment(new Date(), 'YYYY-MM-DD');
    //var fromDate=from.value;

    var today = moment.parseZone(fulldate).format('YYYY-MM-DD');

    if ((type.localeCompare('Sick Leave') == 0) && (moment(from).isAfter(today))) {
     
      return true;
    }

    else {
      return false;
    }



  }

  getHolidaysList() {
    this.dataService.getHolidaysList().subscribe(list => {
      this.holidaysList = list;

    })
  }

  updateHolidaysList() {
    {
      moment.updateLocale('us', {
        holidays: this.holidaysList,
        holidayFormat: 'MM-DD-YYYY'
      });

    }
  }

  validateDates(from: Date, to: Date) {
    if (moment(from).isAfter(to)) {
      console.log("To date cannot be before from date");
      return true;
    }

    else return false;

  }

getLeaveDays(leaveInstance:leave)
{
var diff = moment(leaveInstance.fromDate, 'YYYY-MM-DD').businessDiff(moment(leaveInstance.toDate,'YYYY-MM-DD'));
this.days=diff;
}

getBalance()
{
  this.dataService.getCurrentLeaves().subscribe(result=>
    {this.currentLeaves=result;
      this.currentLeaves.forEach( leave => {
        if(leave.Type =='Sick Leave') {
          this.balance = leave.AllocatedDays - leave.AvailedDays;

        }
      });
    });

}

updateBalance()
{
  
  this.currentLeaves.forEach( leave => {
    if(this.leaveInstance.leaveType == leave.Type) {
      this.balance = leave.AllocatedDays - leave.AvailedDays;
    }
  });
}
isEligibleToApply()
{
  if(this.days>this.balance)
  {
    return false;
  }
  else{
    return true;
  }
}

updateDays()
{
  if(this.leaveInstance.fromDate!=undefined && this.leaveInstance.toDate!=undefined
    &&this.leaveInstance.fromSession!=undefined&&this.leaveInstance.toSession!=undefined)
    {
      var diff = moment(this.leaveInstance.fromDate, 'YYYY-MM-DD').businessDiff(moment(this.leaveInstance.toDate,'YYYY-MM-DD'));
      var session = this.sessionDiff(this.leaveInstance.fromSession,this.leaveInstance.toSession);
      this.days=diff+session;
      console.log(this.days);
    }
}
sessionDiff(one,two)
{
  if(one==two)
  return 0.5
  else if(one>two)
  {return 0}
  else
  {return 1;}

}

getLeaveId(leaveType:string)
{
for(var i=0;i<this.leaveTypes.length;i++)
{if(this.leaveTypes[i]===leaveType)
{
this.leaveInstance.leaveId=i+1;

}
}
}

onHttpError(errorResponse:any)
{
console.log('error: ',errorResponse);
this.postError=true;
this.postErrorMessage=errorResponse.error.error;


}

PostMessage(message:any)
{
  this.messageStatus=true;
  this.postMessage=message;
}

}




