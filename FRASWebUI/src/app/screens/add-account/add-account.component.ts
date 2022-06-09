import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockAPIService } from 'src/app/shared/mock-api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  // isOnLeave: 'y'| 'n' = 'y';
  // isResigned: 'y'| 'n' = 'y';
  accountForm: FormGroup;
  constructor(private dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private auth: AuthService, 
    private api: MockAPIService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ){}
  

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
    name: ['', Validators.required],
    department: ['', Validators.required],
    collegeName: ['', Validators.required],
    onLeave: [false, Validators.required],
    resigned: [false, Validators.required],
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
  if(this.accountForm.valid){
    this.api.addAccount(this.accountForm.value)
    .subscribe({
      next:(res)=>{
        console.log(res);
        console.log(res.id);
        alert("Account Successfully Created");
        this.dialog.closeAll();
        this.nav('accounts');
      },
      error:()=>{
        alert("Error Getting Attendance");
      }
    })
  }



}
}