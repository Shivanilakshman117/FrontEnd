import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { LeaveComponent } from './leave/leave.component';
import { SetLeaveComponent } from './set-leave/set-leave.component';

import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';
import { DirectoryComponent } from './directory/directory.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LogoutComponent } from './logout/logout.component';
import { TrackLeaveComponent } from './track-leave/track-leave.component';


const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,

  },

  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,

  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,

  },
  {
    path: 'leave',
    component: LeaveComponent,

  },
  {
    path: 'verify-employee/:id',
    component: VerifyEmployeeComponent,

  },
  {
    path:'set-leave',
    component:SetLeaveComponent,
  },
  {
    path:'employee-attendance',
    component:EmployeeAttendanceComponent,
  },
  {
    path:'approve-leave',
    component:ApproveLeaveComponent,
  },
  {
    path:'track-leave',
    component:TrackLeaveComponent,
  },
  {
    path:'directory',
    component:DirectoryComponent,
  },
  {
    path:'error-page',
    component:ErrorPageComponent,
  },
  {
    path:'logout',
    component:LogoutComponent,
  },
  { path: '**', redirectTo: 'error-page' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
