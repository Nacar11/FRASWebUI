import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/model/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



import { MockAPIService } from 'src/app/shared/mock-api.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = ['offer_no', 'subj_no', 'subj_name',
  'sch_time', 'sy', 'term', 'dept_code'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  attendance: Array<Account> = [];
   //icons
   
   
   constructor(private api: HttpClient, 
              private mAPI: MockAPIService, 
              private dialog: MatDialog,
              private router: Router) {}
 
   ngOnInit(): void {
    //  this.getData();
    //  this.getAll();
    this.getAllSchedule();
   }
   nav(destination: string) {
    this.router.navigate([destination]);
  }


  async convert(objArray: any) {
    console.log(objArray);
    await this.mAPI.addSchedule(objArray).subscribe((value) => {
      console.log(value);
      alert('schedule has been added to database');
      this.ngOnInit();
    });
  }
  onError(err: any) {
    console.log(err);
  }
  async getAllSchedule(){
    console.log("asdada");
    this.mAPI.getAllSchedule()
    .subscribe({
      next:(res)=>{
        console.log(res.data);
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while displaying all Attendance")
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
