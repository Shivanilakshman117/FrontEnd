import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {

  attendance:any[];
  tempAttendance:any=[];
  constructor(private dataService:DataService, private lay: LayoutService) { }

  ngOnInit() {

    this.lay.showFoot();
    this.lay.showNav();
    this.getAttendance()

  }
  getAttendance() {
    this.dataService.getAttendance().subscribe(
      (result: any) => {
        (result.forEach(element => {
          this.tempAttendance.push(element);
        }),
          error => console.log(error)
        )
      }
    );

    this.attendance = this.tempAttendance;


  }
}

