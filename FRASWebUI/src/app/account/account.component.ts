import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/model/user.model';
import { ApiService } from 'src/app/shared/api.service';
import { CRUDReturn } from '../model/crud_return.interface';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accounts: Array<Account> = [];
  //icons
  faTrash = faTrash;
  faEdit = faEdit;
  viewedUserIndex: number | undefined;
  tf: boolean = true;
  constructor(private api: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  async search(id: any) {
    console.log(id);
    try {
      var result = await this.api
        .get(
          `http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/getAccount/${id}`
        )
        .subscribe((result: any) => {
          console.log(result.success);
          console.log(result.data);
          console.log(result);
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
    var decision = confirm('Delete user ' + this.accounts[i].name);
    if (decision) {
      var result = await this.api.delete(
        `/facial-recognition-syste-c82ae/us-central1/api/user/deleteAccount/${this.accounts[i].id}`
      );
      if (result) {
        this.getData();
      }
    }
  }
  async setResigned(i: number, body: boolean) {
    var decision = confirm('Convert Status of ' + this.accounts[i].name);
    if (decision) {
      if (this.accounts[i].resigned == true) {
        body = true;
      } else if (this.accounts[i].resigned == false) {
        console.log('asdad');
        body = false;
      }
      var result = await this.api.patch(
        `/facial-recognition-syste-c82ae/us-central1/api/user/setResigned/${this.accounts[i].id}`,
        body
      );
      if (result) {
        this.getData();
      }
    }
  }

  handleBackEvent(event: any) {
    if (event == true) {
      this.viewedUserIndex = undefined;
      this.ngOnInit();
    }
  }
  viewUserData(i: number) {
    this.viewedUserIndex = i;
  }

  async resetDB() {
    // var result = await this.api.patch('/user/reset');
    this.getData();
  }
  async getData(term?: any) {
    if (term == undefined || term == null || term == '') {
      this.accounts = await this.getAll();
    } else {
      this.accounts = await this.search(term);
    }
    console.log(this.accounts);
  }
  async getAll(): Promise<Array<Account>> {
    var result = await this.api.get(
      'http://localhost:5000/facial-recognition-syste-c82ae/us-central1/api/user/getAllAccounts'
    );
    var temp: Array<Account> = [];

    if (result) {
      console.log('result');
      result.forEach((json: any) => {
        var tempU = Account.fromJson(json.id, json);
        if (tempU != null) temp.push(tempU);
      });
    }
    return temp;
  }
}
