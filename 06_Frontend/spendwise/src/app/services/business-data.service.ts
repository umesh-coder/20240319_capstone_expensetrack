import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {

  isLogging: boolean = false;
  isChecking: boolean = false;
  hashmap: any = {};
  public pieDialogRef: any;
  pieLabels: any = [];
  piedata: any = [];
  chartType: any;
  expensesLogged: any = 0;
  latestLoginDate: any = '';
  firstLoginDate: any = ''
  keywords: any;
  data: any;
  apiUrl = environment.apiUrl;
  userid: any;
  appVersion: any;
  constructor(private route: Router, public http: HttpClient) {
  }

  onHome() {
    this.route.navigate(['home']);
  }
  onNavigate(url: any) {
    this.route.navigate([url]);
  }

  onGetAllExpense(id: any) {
    this.userid = id;
    
    return this.http.get('http://localhost:2000/expense/getallexpense/' + this.userid);
  }

  onCreateExpense(values: any, date: any) {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    let body = {
      name: values.name,
      amount: values.amount,
      expense_date: (date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment,
      creater: id,
    }
    return this.http.post(this.apiUrl + 'CREATE_EXPENSE', body);
  }


  onImportExpense(values: any) {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    let date = values.expense_date.split('/');
    date = (new Date(date[2], date[1] - 1, date[0])).toString();
    date = date.split(' ');
    let body = {
      name: values.expense_name,
      amount: values.amount,
      expense_date: (date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]),
      expense_category: values.expense_category,
      payment: values.payment_type,
      comment: values.comment,
      creater: id,
    }
    return this.http.post(this.apiUrl + 'CREATE_EXPENSE', body);
  }


  onCreateCategory(body: any) {
    return this.http.post(this.apiUrl + 'SAVE_CATEGORY/' + this.userid, body);
  }

  onDeleteExpense(id: string) {
    return this.http.delete(this.apiUrl + 'DELETE_EXPENSE/' + this.userid + '/' + id);
  }

  onGetSingleExpense(id: string) {
    return this.http.get(this.apiUrl + 'GET_SINGLE_EXPENSE/' + this.userid + '/' + id);
  }

  onUpdateExpense(id: string, values: any) {
    let str = values.expense_date.toString();
    let date = str.split(' ');
    let body = {
      name: values.name,
      amount: values.amount,
      expense_date: (date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3]),
      expense_category: values.expense_category,
      payment: values.payment,
      comment: values.comment,
      creater: this.userid,
    }
    return this.http.patch(this.apiUrl + 'UPDATE_EXPENSE/' + this.userid + '/' + id, body);
  }

  onGetAllCategory() {
    this.userid = sessionStorage.getItem('Id')?.split(' ')[1];
    return this.http.get(this.apiUrl + 'GET_CATEGORY/' + this.userid);
  }
  onGithub() {
    const link = document.createElement('a');
    link.href = "https://github.com/grraghav120";
    link.click();
  }
  onLinkedin() {
    const link = document.createElement('a');
    link.href = "https://www.linkedin.com/in/raghavgarg2002/";
    link.click();
  }

  onGetAppVersion() {
    return this.http.get(this.apiUrl + 'USER/APP_VERSION/');
  }

}
