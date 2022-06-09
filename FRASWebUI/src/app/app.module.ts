import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { attendanceComponent } from './screens/attendance/attendance.component';
import { LoginComponent } from './screens/login/login.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { RegisterComponent } from './screens/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './shared/api.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './shared/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { addAttendannceComponent } from './screens/addAttendance/addAttendance';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { EditComponent } from './screens/edit/edit.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountsComponent } from './screens/accounts/accounts.component';
import { AddAccountComponent } from './screens/add-account/add-account.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { SingleAttendanceComponent } from './screens/single-attendance/single-attendance.component';
import { ScheduleComponent } from './screens/schedule/schedule.component';
import {NgxCSVtoJSONModule} from 'ngx-csvto-json';
import { FacultyViewComponent } from './screens/faculty-view/faculty-view.component';


@NgModule({
  declarations: [
    AppComponent,
    attendanceComponent,
    LoginComponent,
    DefaultLayoutComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    addAttendannceComponent,
    AccountsComponent,
    AddAccountComponent,
    SingleAttendanceComponent,
    ScheduleComponent,
    FacultyViewComponent,
    
    
  
  ],
  imports: [
    NgxCSVtoJSONModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,

    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule
    
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
