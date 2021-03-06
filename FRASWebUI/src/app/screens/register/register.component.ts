import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockAPIService } from 'src/app/shared/mock-api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // isOnLeave: 'y'| 'n' = 'y';
  // isResigned: 'y'| 'n' = 'y';
  accountForm: FormGroup;
  constructor(private dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private auth: AuthService, 
    private api: MockAPIService,
  ){}
  

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
    name: ['', Validators.required],
    id: ['', Validators.required],
    department: ['', Validators.required],
    collegeName: ['', Validators.required],
    
    onLeave: ['', Validators.required],
    resigned: ['', Validators.required],
    })

}
nav(destination: string) {
  this.router.navigate([destination]);
}

submit(){
  console.log("asdasd");
  console.log(this.accountForm.value);
  this.accountForm.value.onLeave = false;
  this.accountForm.value.resigned = false;
  console.log(this.accountForm.value);

  this.api.addAccount(this.accountForm.value)
  .subscribe({
    next:(res)=>{
      console.log(res);
      alert("Account Successfully Added");
      this.dialog.closeAll();
      this.nav('login');
    },
    error:()=>{
      alert("Error Getting Account");
    }
  })





}



}
