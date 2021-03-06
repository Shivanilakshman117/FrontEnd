import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LayoutService } from '../layout.service';
import { approveLeaves } from '../data/approveLeaves';
const moment = require('moment-business-days');

@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent implements OnInit {
applications:any=[];
tempApplications:any=[];
isListEmpty:boolean;
  constructor(private dataService:DataService, private lay: LayoutService) { }

  ngOnInit() {
    this.lay.hideFoot();
    this.lay.showNav();
    this.ApproveLeaves();
  }
approveLeaveInstance:approveLeaves=
{
  id:null,
  status:""

}
  ApproveLeaves()
  {  this.dataService.getApplications().subscribe(
    (result: any) => {
      (result.forEach(element => {
        this.tempApplications.push(element);
      }),
        error => console.log(error)
      )
    }
  );
  
this.applications = this.tempApplications;

this.isListEmpty= this.applications.length==0 ? true:false;

  }

  diff(fd,td,fs,ts)
  {
    var sessionDiff=this.sessionDiff(fs,ts);
    return (moment(td, 'YYYY-MM-DD').businessDiff(moment(fd,'YYYY-MM-DD')) + sessionDiff);
  }

  Reject(id:number)
  { 
    this.approveLeaveInstance.id=id;
    this.approveLeaveInstance.status="Rejected";
    this.dataService.postLeaveStatus(this.approveLeaveInstance).subscribe();
    window.location.reload();
  }

  Approve(id:number)
  {
    this.approveLeaveInstance.id=id;
    this.approveLeaveInstance.status="Approved";

    this.dataService.postLeaveStatus(this.approveLeaveInstance).subscribe();
    window.location.reload();
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
}
