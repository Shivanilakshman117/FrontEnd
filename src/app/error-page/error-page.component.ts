import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private lay:LayoutService) { }

  ngOnInit() {
    this.lay.hideFoot();
    this.lay.hideNav();
  }

}
