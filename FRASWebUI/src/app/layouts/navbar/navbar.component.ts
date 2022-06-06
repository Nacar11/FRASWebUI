import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { addAttendannceComponent } from 'src/app/screens/addAttendance/addAttendance';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MockAPIService } from 'src/app/shared/mock-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  shown = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public auth: AuthService,
    private api: MockAPIService
  ) {}

  ngOnInit(): void {}
  openDialogAtt() {
    this.dialog.open(addAttendannceComponent, {
      width: '40%',
      height: '70%',
    });
  }

  logout() {
    this.auth.logout();
    this.nav('login');
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }

  openDialogAcc() {
    this.dialog.open(addAttendannceComponent, {
      width: '40%',
      height: '70%',
    });
  }
}
