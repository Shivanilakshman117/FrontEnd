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
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';
import { FilterPipe } from './filter.pipe';
import { DirectoryComponent } from './directory/directory.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LogoutComponent } from './logout/logout.component';
import { TrackLeaveComponent } from './track-leave/track-leave.component';


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
    ApproveLeaveComponent,
    FilterPipe,
    DirectoryComponent,
    ErrorPageComponent,
    LogoutComponent,
    TrackLeaveComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
