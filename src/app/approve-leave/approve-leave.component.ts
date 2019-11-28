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

  diff(a,b)
  {
    return moment(b, 'YYYY-MM-DD').businessDiff(moment(a,'YYYY-MM-DD'));
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
}
