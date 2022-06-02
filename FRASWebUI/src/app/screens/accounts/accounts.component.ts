import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/model/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';



import { MockAPIService } from 'src/app/shared/mock-api.service';
import { EditComponent } from 'src/app/screens/edit/edit.component';

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
    console.log("asdada");
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

  editAttendance(element:any){
      this.dialog.open(EditComponent,{
        width:'40%', height:'70%', data: element
      })
  }
}
