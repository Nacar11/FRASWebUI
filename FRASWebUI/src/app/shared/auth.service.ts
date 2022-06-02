import { Injectable } from '@angular/core';
import { Account } from '../model/user.model'; 
import { ApiService } from './api.service';
import { CRUDReturn } from '../model/crud_return.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: Account | null;

  constructor(private api: HttpClient) {}

  get authenticated(): boolean {
    return this.user != undefined && this.user != null;
  }

  async login(email: string, password: string): Promise<CRUDReturn> {
    try {
      var result: any = await this.api.post('/user/login', { email, password });
      var output: CRUDReturn = { success: result.success, data: result.data };
      if (output.success === true) {
        this.user = Account.fromJson(output.data.id, output.data);
      }
      return output;
    } catch (error) {
      if (error instanceof Error)
        return { success: false, data: error.message };
      else return { success: false, data: 'unknown login error' };
    }
  }

  async register(payload: {
    name: string;
    department: string;
    collegeName: string;
    onLeave: boolean;
    onResigned: boolean;
  }) {
    var result = await this.api
    .post(
      `http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/addAccount`, 
       payload).subscribe((result:any) =>{
        console.log(result.data);
        console.log(result);
        
       });
    console.log(result);
    
  
      }
      async addAttendance(payload: {
        name: string;
        date: string;
        time: string;
        classCode: string;
        department: string;
      }) {
        var result = await this.api
        .post(
          `http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/addAttendance`, 
           payload).subscribe((result:any) =>{
            console.log(result.data);
            console.log(result);
            
           });
        console.log(result);
        
      
          }
  logout() {
    this.user = null;
  }
}