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
    employeeID: [, Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    classcode: [123, Validators.required],
    remarks: ['', Validators.required],
    })

    
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
      console.log("asdasd");
      console.log(this.attendanceForm.value);
      console.log(this.attendanceForm.valid);
      console.log(typeof(this.attendanceForm.value.employeeID));
      this.attendanceForm.value.employeeID = parseInt(this.attendanceForm.value.employeeID)
      this.attendanceForm.value.classcode = parseInt(this.attendanceForm.value.classcode)
      console.log(typeof(this.attendanceForm.value.employeeID));
      this.api.addAttendance(this.attendanceForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res.success);
          console.log(res.data);
          console.log(res.data.employeeID);
          console.log("res");
          alert("Attendance Successfully Added");
          this.dialog.closeAll();
          this.nav('attendancelist');
        },
        error:()=>{
          alert("Error Getting Attendance");
        }
      })
    
  
 
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
