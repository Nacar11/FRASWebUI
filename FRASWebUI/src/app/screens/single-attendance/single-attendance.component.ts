import { Component, OnInit, Inject } from '@angular/core';
import { attendanceComponent } from '../attendance/attendance.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-attendance',
  templateUrl: './single-attendance.component.html',
  styleUrls: ['./single-attendance.component.scss']
})
export class SingleAttendanceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<attendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data', this.data);
    }

  element:any = this.data.data;

  
  ngOnInit(): void {
    console.log(this.element);
  }

  

}
