import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockAPIService } from 'src/app/shared/mock-api.service';
import { FacultyViewComponent } from '../faculty-view/faculty-view.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private api: MockAPIService, ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
    id: ['', Validators.required],
    password: ['', Validators.required],
    
    })
  }
  requestResult = '';
  error = '';
   login() {
     
    


    this.api.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        console.log(res);
        alert("Account Successfully Logged in");
        console.log(this.loginForm.value);
        this.openDialogFaculty(this.loginForm.value);
      },
      error:()=>{
        alert("Error, Invalid Credentials");
        console.log(this.loginForm.value)
      }
    })

   
    
   }

   openDialogFaculty(element: any){
    this.dialog.open(FacultyViewComponent,{
      width:'40%', height:'63%', data: element
    })
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
