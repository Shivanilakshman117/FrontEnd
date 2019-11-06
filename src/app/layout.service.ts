import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  navVisible: boolean;
  footVisible:boolean;

  constructor() { this.navVisible = false;
                  this.footVisible=false; }

  hideNav() { this.navVisible = false;
           }

  showNav() { this.navVisible = true;
            }
  hideFoot() { 
              this.footVisible=false; }
   
 showFoot() { 
               this.footVisible=true; }
   

  toggleNav() { this.navVisible = !this.navVisible; }
  toggleFoot() { this.footVisible = !this.footVisible; }

}
