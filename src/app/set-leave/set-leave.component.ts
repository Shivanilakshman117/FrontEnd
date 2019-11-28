import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import * as moment from 'moment';
import { LayoutService } from '../layout.service';



@Component({
  selector: 'app-set-leave',
  templateUrl: './set-leave.component.html',
  styleUrls: ['./set-leave.component.css']
})
export class SetLeaveComponent implements OnInit {

  holidays:any[];

  constructor(private hols:DataService,private lay: LayoutService) { }

  ngOnInit() {
    this.lay.hideFoot();
    this.hols.getHolidaysList().subscribe(list=>{
      this.holidays=list;
      console.log(this.holidays);
    })
    moment.updateLocale('us', {
      holidays: this.holidays,
      holidayFormat: 'MM-DD-YYYY'
   });
  }

  }


