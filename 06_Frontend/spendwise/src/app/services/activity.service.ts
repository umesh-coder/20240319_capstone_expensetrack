import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  //api integration



  private apiUrl = 'http://localhost:2000/group/getallgroups';

  constructor(private http: HttpClient) { }

  getAllGroupsByEmail(email: string): Observable<any> {


    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log("get group data by email local token:-" + token);


    let params = new HttpParams().set('email', email);
    return this.http.get(this.apiUrl, { headers, params });
  }
};