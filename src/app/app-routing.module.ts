import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


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
      path: 'leave',
      component: AddEmployeeComponent,
  
  },

  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
