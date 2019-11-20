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


  // leaveTypes = ['Sick Leave', 'Casual Leave', 'Privilege Leave'];
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
    status: 'Applied'
  }
  u:user=
  {
    employeeId:"P1149",
    token:"abc"
  }
  holidaysList: any[];
  currentLeaves: any[];
  sickLeaveError = false;
  sickLeaveMessage = '';

  advanceError=false;
  advanceMessage='';

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
   /* console.log(this.leaveInstance);
    var result = this.validateForSickLeave(this.leaveInstance.fromDate, this.leaveInstance.leaveType);

    if (result) {
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

    this.getLeaveDays(this.leaveInstance);*/
    console.log(this.currentLeaves);
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
  console.log("Diff=",diff);
  console.log(leaveInstance.fromDate);
}

getBalance()
{
 

  this.dataService.getCurrentLeaves(this.u).subscribe(result=>
    {this.currentLeaves=result;
  
    })


}
Types:any[];
bal:number[];
updateBalance()
{
  /*let other = []; // your other array...

  this.currentLeaves.map(item => {
    return {
        Type: item.Type,
        AllocatedDays: item.AllocatedDays
    }
}).forEach(item => other.push(item));
console.log(other); 
}*/

  this.currentLeaves.forEach( leave => {
    if(this.leaveInstance.leaveType == leave.Type) {
      this.balance = leave.AllocatedDays - leave.AvailedDays;
    }
  });
}

}



