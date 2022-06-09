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

import { SingleAttendanceComponent } from '../single-attendance/single-attendance.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class attendanceComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Date', 'Time', 'remark', 'action'];
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
    this.getAllAttendance();
   }
   nav(destination: string) {
    this.router.navigate([destination]);
  }
   async search(id: any) {
    
    try {
      var result = await this.api
        .get(
          `http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/getAccount/${id}`
        )
        .subscribe((result: any) => {
          console.log(result.success);
          console.log(result.data);
          console.log(result);
          if (result.success== true) {
            var acco:Array<Account>=[];
            acco.push(Account.fromJson(id, result.data)!);
            this.attendance = acco;
          }
          else {
            this.getAll();
          }
          console.log(this.attendance);

        });
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    // var temp: Array<Account> = [];
    // if (result.success) {
    //   result.data.forEach((json: any) => {
    //     var tempU = Account.fromJson(json.id, json);
    //     if (tempU != null) temp.push(tempU);
    //   });
    // }
    // return temp;
    return [];
  }

  async deleteUser(i: number) {
    var decision = confirm('Delete user ' + this.attendance[i].name);
    if (decision) {
      var result = await this.api.delete(
        `http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/deleteAccount/${this.attendance[i].id}`
      ).subscribe((result: any) => {
        console.log(result.success);
        console.log(result.data);
        console.log(result);
        if (result.success== true) {
          console.log("asdasd");
          alert("Successfully deleted Account");
          this.getAll();
        }
        

      });
      
    }
  }
  async setResigned(i: number) {
    var decision = confirm('Convert Status of ' + this.attendance[i].name);
    if (decision) {
      var body;
      if (this.attendance[i].onResigned == true) {
        body = false;
      } else if (this.attendance[i].onResigned == false) {
        console.log('asdad');
        body = true;
      }
      var result = await this.api.patch(
        `http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/setResigned/${this.attendance[i].id}`
        ,body
      ).subscribe((result: any) => {
        console.log(result.success);
        console.log(result.data);
        console.log(result);
        if (result.success) {
          this.getAll();
        }
        
        

      });
     
    }
  }
 
  //  handleBackEvent(event:any){
  //    if(event  == true){
  //      this.viewedUserIndex = undefined;
  //      this.ngOnInit();
  //    }
 
  //  }
  //  viewUserData(i:number) {
  //   this.viewedUserIndex = i;
  //  }
 
   async resetDB(){
    //  var result = await this.api.patch('/user/reset');
     this.getData();
   }
   async getData(term?: any) {
    //  if (term == undefined || term == null || term=='') {
    //    this.accounts = await this.getAll();
    //  }
    //  else {
    //    this.accounts = await this.search(term);
    //  }
    //  console.log(this.accounts);
   }
   async getAll() {
    var result = await this.api.get(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/getAllAccounts'
    ).subscribe((result: any) => {
      console.log(result.success);
      console.log(result.data);
      console.log(result);
      if (result.data == undefined || result.data == null || result.data=='') {
        this.attendance = result.data;
      }
      else {
        this.attendance = result.data;
      }
      console.log(this.attendance);

    });
    
    var temp: Array<Account> = [];
    
    // console.log(result);
    // if (result) {
      
    //   result.forEach((json: any) => {
    //     var tempU = Account.fromJson(json.id, json);
    //     if (tempU != null) temp.push(tempU);
    //   });
    // }
    
  }

  async getAllAttendance(){
    console.log("asdada");
    this.mAPI.getAttendance()
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

 

  getSingleAttendance(element:any){
    
    this.mAPI.getSingleAttendance(element.attendanceID).subscribe({
      next:(res)=>{
        console.log(res); 

        this.dialog.open(SingleAttendanceComponent,{
          width:'40%', height:'45%', data: res
        },)
      },
      error:()=>{
        alert("Failed to Delete Attendance");
      }
    })

    
  }
  deleteAttendance(element: any){
    console.log(element);
    console.log(typeof(element.attendanceID));
    this.mAPI.deleteAttendance(element.attendanceID).subscribe({
      next:(res)=>{
        alert("Attedance Deleted");
        console.log(res); 
        this.getAllAttendance();
      },
      error:()=>{
        alert("Failed to Delete Attendance");
      }
    })
  }


}
