import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { attendanceComponent } from './screens/account/attendance.component';
import { LoginComponent } from './screens/login/login.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RegisterComponent } from './screens/register/register.component';
import { addAttendannceComponent } from './screens/addAttendance/addAttendance';
import { AccountsComponent } from './screens/accounts/accounts.component';





const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path:'',
        component: LoginComponent,
      },
      {
        path:'login',
        component: LoginComponent,
      },
      {
        path: 'attendancelist',
        component: attendanceComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
      },
    
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
