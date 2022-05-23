import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';




const routes: Routes = [
  
    
      {
        path:'',
        component: AccountComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
      // {
      //   path: 'home',
      //   component: HomeComponent
      // },
    
      // {
      //   path: 'register',
      //   component: RegisterComponent
      // }
    
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
