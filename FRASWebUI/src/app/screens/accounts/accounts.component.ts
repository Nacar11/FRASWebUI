import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/model/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';



import { MockAPIService } from 'src/app/shared/mock-api.service';

// import { EditComponent } from 'src/app/screens/edit/edit.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'ID', 'Department', 'collegeName', 'onLeave', 'resigned', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  accounts: Array<Account> = [];
  constructor(private api: HttpClient, 
              private mAPI: MockAPIService, 
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllAccounts();
  }

  async getAllAccounts(){
    this.mAPI.getAllAccounts()
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

 
  
  deleteAccount(element: any){
    console.log(element);
    console.log(typeof(element.id));
    this.mAPI.deleteAccount(element.id).subscribe({
      next:(res)=>{
        alert("Attendance Deleted");
        console.log(res); 
        this.getAllAccounts();
      },
      error:()=>{
        alert("Failed to Delete Attendance");
      }
    })
  }

  editOnLeave(element:any){
    console.log(element.id);
    console.log(element.onLeave);

    if(element.onLeave){
      this.mAPI.putOnLeave(element.id, false).subscribe({
        next:(res)=>{
          alert("Attendance Edited");
          console.log(res); 
          this.getAllAccounts();
        },
        error:()=>{
          alert("Failed to Edit Attendance");
        }
      })
    }
    else{
      console.log(element.onLeave);
      this.mAPI.putOnLeave(element.id, true).subscribe({
        next:(res)=>{
          alert("Attendance Edited");
          console.log(res); 
          this.getAllAccounts();
        },
        error:()=>{
          alert("Failed to Edit Attendance");
        }
      })
    }

  }
  editResigned(element:any){
    console.log(element.id);
    console.log(typeof(element.id));
    console.log(element.onLeave);
    let a = element.id.toString();
    console.log(typeof(element.id));
    console.log(a);
    if(element.onLeave){
      this.mAPI.putResigned(a, "false").subscribe({
        next:(res)=>{
          alert("Attendance Edited");
          console.log(res); 
          this.getAllAccounts();
        },
        error:()=>{
          alert("Failed to Edit Attendance");
        }
      })
    }
    else{
      
      console.log(element.onLeave);
      this.mAPI.putResigned(element.id, true).subscribe({
        next:(res)=>{
          alert("Attendance Edited");
          console.log(res); 
          this.getAllAccounts();
        },
        error:()=>{
          alert("Failed to Edit Attendance");
        }
      })
    }
    
  }
}
