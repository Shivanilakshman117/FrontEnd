import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public nav: LayoutService) { }

  ngOnInit() {
    this.nav.showNav();
  }

}
