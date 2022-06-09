import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockAPIService {
  constructor(private http: HttpClient) {}

  addAttendance(data: any) {
    return this.http.post<any>(
      "https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/attendance/add",
      data
    );
  }

  addSchedule(data: any) {
    return this.http.post<any>(
      "https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/schedule/add",
      data
    );
  }
  getAttendance() {
    return this.http.get<any>(
      "https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/attendance/get/all"
    );
  }

  getAllSchedule() {
    return this.http.get<any>(
      "https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/schedule/get/all"
    );
  }

  getAllAccounts() {
    return this.http.get<any>(
      "https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/accounts/get/all"
    );
  }
  getAccountof(id: any) {
    return this.http.get<any>(
      "https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/attendance/get/accountOf/"+id
    );
  }
  getSingleAttendance(id:number){
    return this.http.get<any>("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/attendance/get/"+id)
 }


  putOnLeave(id: string, data:any){
    return this.http.patch<any>("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/accounts/setOnleave/"+id, data)
 }
 
 putResigned(id: string, data:any){
  return this.http.patch<any>
  ("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/accounts/setResigned/"+id, data)
}

  deleteAttendance(id: number){
    return this.http.delete<any>("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/attendance/delete/"+id)
  }

  deleteAccount(id: number){
    return this.http.delete<any>("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/accounts/delete/"+id)
  }

  addAccount(data:any){
    return this.http.post<any>("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/accounts/add",data)
  }

  login(data:any){
    console.log(typeof(data.id));
    console.log(typeof(data.password));
    return this.http.get<any>
    ("https://us-central1-facial-recognition-syste-c82ae.cloudfunctions.net/api/auth/"+data.id+"/"+data.password)
  }
}
