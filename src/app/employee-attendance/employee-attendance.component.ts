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
  fromDate:Date;
  toDate:Date;
  filters=['Overtime', 'UnderTime', 'Present','Absent','None'];
  public searchText: string;
  empty:boolean;
  constructor(private dataService:DataService, private lay: LayoutService) { }

  ngOnInit() {

    this.lay.hideFoot();
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
   this.empty=this.attendance.length==0 ? true:false;

  }

  track()
  {
    this.attendance.forEach(row=>
      {
        if(row.Status=='!Overtime')
        this.attendance.pop();
      });
      console.log(this.attendance);
  }
}

