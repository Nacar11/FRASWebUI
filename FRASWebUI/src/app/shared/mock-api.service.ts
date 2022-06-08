import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockAPIService {
  constructor(private http: HttpClient) {}

  addAttendance(data: any) {
    return this.http.post<any>(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/attendance/add',
      data
    );
  }

  addSchedule(data: any) {
    return this.http.post<any>(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/schedule/add',
      data
    );
  }
  getAttendance() {
    return this.http.get<any>(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/attendance/get/all'
    );
  }

  getAllSchedule() {
    return this.http.get<any>(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/schedule/get/all'
    );
  }

  getAllAccounts() {
    return this.http.get<any>(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/accounts/get/all'
    );
  }

  getSingleAttendance(id:number){
    return this.http.get<any>("http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/attendance/get/"+id)
 }

  getAllSchedule(){
    return this.http.get<any>("http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/schedule/get/all")
 }

  getAllAccounts(){
    return this.http.get<any>("http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/accounts/get/all")
 }

  putAttendance(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/attendanceForm"+id, data)
  }
  
  deleteAttendance(id: number){
    return this.http.delete<any>("http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/attendance/delete/"+id)
  }

  deleteAccount(id: number){
    return this.http.delete<any>("http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/accounts/delete/"+id)
  }

  addAccount(data:any){
    return this.http.post<any>("http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/accounts/add",data)
  }
}
