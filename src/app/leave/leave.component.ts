import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';
import { leave } from '../data/leave';
import { NgForm, AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  holidaysList: any[];
  sickLeaveError = false;
  sickLeaveMessage = '';

  constructor(private dataService: DataService, private router: Router,
    private lay: LayoutService) { }


  ngOnInit() {
    this.lay.showFoot();
    this.lay.showNav();

    this.getccToList();
    this.getreportingAuthorities();
    this.getHolidaysList();
    this.updateHolidaysList();


  }
  onSubmit(leaveForm: NgForm) {
    console.log(this.leaveInstance);
    var result = this.validateForSickLeave(this.leaveInstance.fromDate, this.leaveInstance.leaveType);
    console.log("Hi", result);
    if (result) {
      this.sickLeaveError = true;
      this.sickLeaveMessage = "Cannot apply sick leave in advance!";
    }
    else {
      this.sickLeaveError = false;
    }
    this.validateDates(this.leaveInstance.fromDate, this.leaveInstance.toDate);
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
      console.log("Cannot apply sick leave in advance!");
      return true;
    }
    //return {'advanceError':"Cannot apply sick leave in advance!"};
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
    }

  }

//getBalanceLeave()


}


