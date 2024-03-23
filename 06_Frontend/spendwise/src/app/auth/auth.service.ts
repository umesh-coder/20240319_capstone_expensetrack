import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private isAuth: boolean = false;
  private token!: any;
  private expireTokenTime: any;
  private userid: any;
  constructor(
    public http: HttpClient,
    public _snackBar: MatSnackBar,
    public route: Router
  ) { }

  authAfterReferesh(isAuth: boolean, token: any) {
    this.isAuth = isAuth;
    this.token = token;
  }
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }
  getUSerId() {
    return this.userid;
  }

  onSignUp(values: any): Promise<boolean> {
    console.log(values);
    return new Promise<boolean>((resolve, reject) => {

      const date = new Date()

      const strdate = (date.toString()).substring(0,16)

      // console.log("date:-" + strdate);

      // console.log("date type " + typeof (strdate));

      let body = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        // userfirstsignup: new Date(),
        userfirstsignupdate: strdate,
        category: ['Transportation', 'Groceries'],
      };

      this.http.post('http://localhost:2000/auth/signup', body).subscribe(
        (res: any) => {
          if (res) {
            this._snackBar.open(
              'Expense Tracker Account Created SuccessFully',
              '',
              { duration: 4000 }
            );
            this.token = res.data.token;
            this.userid = res.data.userid;
            console.log("new id"+this.userid);
            
            let body = {
              firstlogindate: res.data.UserSince,
              username: res.data.username,
              name: res.data.name,
              lastlogindate: res.data.UserSince,
              userid: res.data.userid,
              expenselogged: 0,
            };
            this.saveAllData(body);
            this.expireTokenTime = setTimeout(() => {
              this.onLogout();
            }, res.data.expiredToken * 1000);
            this.isAuth = true;
            this.saveAuthDataonLocalStorage(res.data.expiredToken, res.data.userid);
            this.route.navigate(['dashboard']);
            resolve(true);
          }
        },
        (error) => {
          // console.log(error);
          this._snackBar.open('Email Already Exist! Login Please', '', {
            duration: 5000,
          });
          this.isAuth = false;
          reject(error);
        }
      );
    });
  }

  onLogin(body: any): Promise<boolean> {
    console.log("body:" + body.email);

    return new Promise<boolean>((resolve, reject) => {
      this.http.post('http://localhost:2000/auth/login', body).subscribe(
        (res: any) => {
          this._snackBar.open(res.message, '', { duration: 3000 });
          this.token = res.data.token;
          this.isAuth = true;
          this.expireTokenTime = setTimeout(() => {
            this.onLogout();
          }, res.data.expiredToken * 1000);
          this.saveAuthDataonLocalStorage(res.data.expiredToken, res.data.userid);
          let updateData = {
            lastLoginDate: res.data.latestLoginDate,
          }
          this.updateUserData(res.data.userid, updateData);
          this.route.navigate(['dashboard']);
          resolve(true);
        },
        (error) => {
          this._snackBar.open(error.error.message, '', { duration: 3000 });
          this.isAuth = false;
          reject(error);
        });
    });
  }

  onLogout() {
    this.token = null;
    this.isAuth = false;
    this.route.navigate(['welcome']);
    clearTimeout(this.expireTokenTime);
    sessionStorage.removeItem('LEAD_ID');
    sessionStorage.removeItem('Id');
    localStorage.removeItem('LEAD_ID');
    localStorage.removeItem('Id');
  }

  private saveAuthDataonLocalStorage(time: any, userid: any) {
    userid = "954854384ubbbfhf9489r34r34fnnn " + userid + "id";
    sessionStorage.setItem('LEAD_ID', this.token);
    sessionStorage.setItem('Id', userid);
    localStorage.setItem('LEAD_ID', this.token);
    localStorage.setItem('Id', userid);
    setTimeout(() => {
      this.onLogout();
    }, time * 1000);
  }

  saveAllData(body: any) {

    this.http.post('http://localhost:2000/expense/savedata', body).subscribe((res: any) => {
      this._snackBar.open('Expense Tracker Account Created SuccessFully', '', { duration: 2000 });
    })
  }

  getAllSaveData() {
    return this.http.get(this.apiUrl + 'GET_SAVE_DATA/' + sessionStorage.getItem('Id')?.split(' ')[1]);
  }

  updateUserData(id: string, body: any) {
    // let userid=localStorage.getItem('Id')?.split(' ')[1];
    this.http.post(this.apiUrl + 'UPDATE_SAVE_DATA/' + id, body).subscribe((result) => {
      // console.log(result);
    })
  }

  updateProfile(body: any) {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    return this.http.post(this.apiUrl + 'UPDATE_PROFILE/' + id, body);
  }

  updateWholeInfo(body: any) {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    return this.http.post(this.apiUrl + 'UPDATE_NAME/' + id, body);
  }

  deleteUserAccount() {
    let id = sessionStorage.getItem('Id')?.split(' ')[1];
    return this.http.delete(this.apiUrl + 'USER/DELETE_ACCOUNT/' + id);
  }

}
