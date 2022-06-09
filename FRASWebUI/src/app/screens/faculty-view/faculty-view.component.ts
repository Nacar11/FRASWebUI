import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockAPIService } from 'src/app/shared/mock-api.service';
import { attendanceComponent } from '../attendance/attendance.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-faculty-view',
  templateUrl: './faculty-view.component.html',
  styleUrls: ['./faculty-view.component.scss']
})
export class FacultyViewComponent implements OnInit {
  
  displayedColumns: string[] = ['date', 'time', 'remarks'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, 
    private mAPI: MockAPIService, 
    public dialogRef: MatDialogRef<attendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data', this.data);
    }

  element:any = this.data;
  
  
  list:any;
  ngOnInit(): void {
    console.log(this.element);
    this.getAccountof(this.element.id)
    console.log("asdasd");
    
  }

  getAccountof(id:any){
    this.mAPI.getAccountof(id)
    .subscribe({
      next:(res)=>{
        console.log(res.data);
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while displaying Attendance of Account")
      }
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


}
