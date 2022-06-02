import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MockAPIService } from 'src/app/shared/mock-api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-addAttendance',
  templateUrl: './addAttendance.html',
  styleUrls: ['./addAttendance.scss']
})
export class addAttendannceComponent implements OnInit {

  attendanceForm: FormGroup;
  actionBtn: string = " Create Attendance";



  constructor(private dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private auth: AuthService, 
    private api: MockAPIService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ){}
  


  ngOnInit(): void {
    this.attendanceForm = this.formBuilder.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    classCode: ['', Validators.required],
    department: ['', Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.attendanceForm.controls['fcName'].setValue(this.editData.name);
      this.attendanceForm.controls['fcDate'].setValue(this.editData.date);
      this.attendanceForm.controls['fcTime'].setValue(this.editData.time);
      this.attendanceForm.controls['fcTime'].setValue(this.editData.time);
      this.attendanceForm.controls['fcDept'].setValue(this.editData.department);
    }
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  

 

  
  // attendanceForm: FormGroup = new FormGroup({
  //   fcName: new FormControl('', Validators.required),
  //   fcDate: new FormControl('', Validators.required),
  //   fcTime: new FormControl('', Validators.required),
  //   fcClassCode: new FormControl('', Validators.required),
  //   fcDept: new FormControl('', Validators.required),
   
  // });

  error: string = '';
  // onSubmit() {
  //   console.log(this.attendanceForm.value);
  //   if (this.attendanceForm.valid) {
      
  //     var payload: {
  //       name: string;
  //       date: string;
  //       time: string;
  //       classCode: string;
  //       department: string;
  //     };
  //     payload = {
  //       name: this.attendanceForm.value.fcName,
  //       date: this.attendanceForm.value.fcDate,
  //       time: this.attendanceForm.value.fcTime,
  //       classCode: this.attendanceForm.value.fcclassCode,
  //       department: this.attendanceForm.value.fcDept,

  //     };
  //     console.log(payload);
  //     this.auth.addAttendance(payload).then((data) => {
  //       console.log(data);
  //       if (this.auth.authenticated) {
  //         alert("Successfully Created Account");
  //         this.nav('accounts');
  //       // } else {
  //       //   this.error = data.data;
  //       //   console.log(this.error);
  //       }
  //     });
  //   }
  // }
  submit(){
    if(!this.editData){
      console.log(this.editData);
      console.log(this.attendanceForm.value);
    if(this.attendanceForm.valid){
      this.api.addAttendance(this.attendanceForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res);
          alert("Attendance Successfully Added");
          this.dialog.closeAll();
          this.nav('account');
        },
        error:()=>{
          alert("Error Getting Attendance");
        }
      })
    }
  }
  else{
    this.updateAttendance();
  }
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
