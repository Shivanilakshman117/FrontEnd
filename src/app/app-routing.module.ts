import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { LeaveComponent } from './leave/leave.component';
import { SetLeaveComponent } from './set-leave/set-leave.component';


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
    path: 'verify-employee',
    component: VerifyEmployeeComponent,

  },
  {
    path:'set-leave',
    component:SetLeaveComponent,
  }
  // otherwise redirect to login
  //{ path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
