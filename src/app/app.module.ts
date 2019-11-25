import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';
import {HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { LeaveComponent } from './leave/leave.component';
import * as moment from 'moment';
import { SetLeaveComponent } from './set-leave/set-leave.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AddEmployeeComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    VerifyEmployeeComponent,
    LeaveComponent,
    SetLeaveComponent,
    EmployeeAttendanceComponent,
    ApproveLeaveComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
