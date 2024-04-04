import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private baseUrl = 'http://localhost:2000/groupExpense';
  constructor(private http: HttpClient) {}

    createExpense(data: any): Observable<any> {
      const token = sessionStorage.getItem('LEAD_ID');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(`${this.baseUrl}/createExpense`, data, { headers });
    }
  
    getExpenses(groupId: string): Observable<any> {
      const token = sessionStorage.getItem('LEAD_ID');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.baseUrl}/getExpenses/?groupId=${groupId}`, { headers });
    }
  
    getMemberExpenses(): Observable<any> {
      const token = sessionStorage.getItem('LEAD_ID');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.baseUrl}/memberExpense`, { headers });
    }
  
    updateExpenseStatus(expenseId: string): Observable<any> {
      const token = sessionStorage.getItem('LEAD_ID');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(`${this.baseUrl}/updateExpenseStatus?expenseId=${expenseId}`, null, { headers });
    }
    getMembers(groupId: string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/getMembers?groupId=${groupId}`);
    }
   }

