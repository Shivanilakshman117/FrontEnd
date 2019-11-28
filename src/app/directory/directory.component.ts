import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  constructor(private dataService:DataService, private lay: LayoutService) { }
employeesList:any=[];
  ngOnInit() {
    
    this.lay.showFoot();
    this.lay.showNav();
    this.getEmployees();
  }
getEmployees()
{
  this.dataService.postForEmployeeList().subscribe(
    (result: any) => {
      (result.forEach(emp => {
        this.employeesList.push(emp);

      }),
        error => console.log(error)
      )
    }
  );


}
}
