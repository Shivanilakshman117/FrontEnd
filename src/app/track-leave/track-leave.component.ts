import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LayoutService } from '../layout.service';
import { approveLeaves } from '../data/approveLeaves';
const moment = require('moment-business-days');
@Component({
  selector: 'app-track-leave',
  templateUrl: './track-leave.component.html',
  styleUrls: ['./track-leave.component.css']
})
export class TrackLeaveComponent implements OnInit {
  applications: any = [];
  tempApplications: any = [];
  isListEmpty: boolean;
  constructor(private dataService: DataService, private lay: LayoutService) { }

  ngOnInit() {
    this.lay.hideFoot();
    this.lay.showNav();
    this.TrackLeaves();
  
  }

  TrackLeaves() {
    this.dataService.getMyLeaves().subscribe(
      (result: any) => {
        (result.forEach(element => {
          this.tempApplications.push(element);
        }),
          error => console.log(error)
        )
      }
    );

    this.applications = this.tempApplications;
    this.isListEmpty = this.applications==undefined ? true : false;
    console.log(this.isListEmpty, this.tempApplications.length, this.tempApplications);
   
  }

  diff(fd, td, fs, ts) {
    var sessionDiff = this.sessionDiff(fs, ts);
    return (moment(td, 'YYYY-MM-DD').businessDiff(moment(fd, 'YYYY-MM-DD')) + sessionDiff);
  }


  sessionDiff(one, two) {
    if (one == two)
      return 0.5
    else if (one > two) { return 0 }
    else { return 1; }

  }
}

