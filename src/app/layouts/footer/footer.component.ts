import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public footer: LayoutService) { }

  ngOnInit() {
    this.footer.showFoot();
  }

}
