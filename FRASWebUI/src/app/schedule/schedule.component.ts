import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MockAPIService } from '../shared/mock-api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = [
    'offer_no',
    'subj_no',
    'subj_name',
    'sch_days',
    'sch_time',
    'sy',
    'term',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private mAPI: MockAPIService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllSchedule();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getAllSchedule() {
    this.mAPI.getAllSchedule().subscribe({
      next: (res) => {
        console.log(res.data);
        console.log(res);
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while displaying all Attendance');
      },
    });
  }
}
