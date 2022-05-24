import { Injectable } from '@angular/core';
import { Account } from '../model/Account'; 
import { ApiService } from './api.service';
import { CRUDReturn } from '../model/crud_return.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: Account | null;

  constructor(private api: ApiService) {}

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
    age: number;
    email: string;
    password: string;
  }): Promise<CRUDReturn> {
    var result: any = await this.api.post('/user/register', payload);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.user = Account.fromJson(output.data.id, output.data);
    }
    return output;
  }

  logout() {
    this.user = null;
  }
}