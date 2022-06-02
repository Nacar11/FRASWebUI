
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockAPIService } from 'src/app/shared/mock-api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  attendanceForm: FormGroup;
  constructor(private dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private auth: AuthService, 
    private api: MockAPIService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ){}

  ngOnInit(): void {
    this.attendanceForm = this.formBuilder.group({
    fcName: ['', Validators.required],
    fcDate: ['', Validators.required],
    fcTime: ['', Validators.required],
    fcDept: ['', Validators.required],
    })

    this.attendanceForm.controls['fcName'].setValue(this.editData.fcName);
    this.attendanceForm.controls['fcDate'].setValue(this.editData.fcDate);
    this.attendanceForm.controls['fcTime'].setValue(this.editData.fcTime);
    this.attendanceForm.controls['fcDept'].setValue(this.editData.fcDept);
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  updateAttendance(){
    this.api.putAttendance(this.attendanceForm, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Attendance Updated Successfully");
        this.attendanceForm.reset();
        this.dialog.closeAll();
      },
      error:(err)=>
      alert("Error Updating Attendance")
    })
  }
}
