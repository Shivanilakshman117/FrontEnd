import { Injectable } from '@angular/core';
import { employee } from './employee';

const moment = require('moment-business-days');

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
emailError:boolean=false;
emailErrorMessage='';
mobileError:boolean=false;
mobileErrorMessage='';
dobError:boolean=false;
dobErrorMessage='';
dojError:boolean=false;
dojErrorMessage='';
isFormValid:boolean=true;

  constructor() { }
  validateForm(employeeInstance:employee)
  {
 console.log("val");
    var pattern =/^\w+([\.-]?\w+)*@psiog.com/;
    if(!pattern.test(employeeInstance.email))
    {
      this.emailErrorMessage="Invalid Email ID. ID must end with @psiog.com";
      this.emailError=true;
      this.isFormValid=false;
    }

    if(!(employeeInstance.mobile>=6000000000 && employeeInstance.mobile<10000000000))
    {
      this.mobileErrorMessage="Invalid mobile number";
      this.mobileError=true;
      this.isFormValid=false;
    }

   if (!(moment(employeeInstance.doj).isAfter('01/08/2014')))
   { 
    this.dojErrorMessage="DOJ must be after August 1, 2014";
    this.dojError=true;
    this.isFormValid=false;
   }
   var now = moment(new Date());
   var end = moment(employeeInstance.dob);
   var years = Math.abs(end.diff(now, 'years'));

   if (!(years>=21 && years<=70))
   { 
    this.dobErrorMessage="Employee must be atleast 21 years in age and not older than 70!";
    this.dobError=true;
    this.isFormValid=false;
   }

  }
}
