import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  // getData() {
  //   return [
  //     {
  //       id: 1495,
  //       name: 'Brittni Gillaspie',
  //       country: {
  //         name: 'Senegal',
  //         code: 'sn'
  //       },
  //       company: 'Inner Label',
  //       date: '2019-11-23',
  //       status: 'renewal',
  //       verified: true,
  //       activity: 14,
  //       representative: {
  //         name: 'Ioni Bowcher',
  //         image: 'ionibowcher.png'
  //       },
  //       balance: 72342
  //     },
  //     {
  //       id: 1496,
  //       name: 'Raylene Kampa',
  //       country: {
  //         name: 'Belgium',
  //         code: 'be'
  //       },
  //       company: 'Hermar Inc',
  //       date: '2020-04-22',
  //       status: 'unqualified',
  //       verified: true,
  //       activity: 65,
  //       representative: {
  //         name: 'Stephen Shaw',
  //         image: 'stephenshaw.png'
  //       },
  //       balance: 53660
  //     },
  //     {
  //       id: 1497,
  //       name: 'Flo Bookamer',
  //       country: {
  //         name: 'Argentina',
  //         code: 'ar'
  //       },
  //       company: 'Simonton Howe & Schneider Pc',
  //       date: '2020-08-10',
  //       status: 'unqualified',
  //       verified: true,
  //       activity: 30,
  //       representative: {
  //         name: 'Amy Elsner',
  //         image: 'amyelsner.png'
  //       },
  //       balance: 44528
  //     },
  //     {
  //       id: 1498,
  //       name: 'Jani Biddy',
  //       country: {
  //         name: 'Switzerland',
  //         code: 'ch'
  //       },
  //       company: 'Warehouse Office & Paper Prod',
  //       date: '2019-11-07',
  //       status: 'negotiation',
  //       verified: false,
  //       activity: 20,
  //       representative: {
  //         name: 'Onyama Limba',
  //         image: 'onyamalimba.png'
  //       },
  //       balance: 69613
  //     },
  //     {
  //       id: 1499,
  //       name: 'Chauncey Motley',
  //       country: {
  //         name: 'Argentina',
  //         code: 'ar'
  //       },
  //       company: 'Affiliated With Travelodge',
  //       date: '2019-04-23',
  //       status: 'renewal',
  //       verified: true,
  //       activity: 42,
  //       representative: {
  //         name: 'Amy Elsner',
  //         image: 'amyelsner.png'
  //       },
  //       balance: 88090
  //     }
  //   ];
  // }



  // getCustomersMini() {
  //   return Promise.resolve(this.getData().slice(0, 5));
  // }

  // getCustomersSmall() {
  //   return Promise.resolve(this.getData().slice(0, 10));
  // }

  // getCustomersMedium() {
  //   return Promise.resolve(this.getData().slice(0, 50));
  // }

  // getCustomersLarge() {
  //   return Promise.resolve(this.getData().slice(0, 200));
  // }

  // getCustomersXLarge() {
  //   return Promise.resolve(this.getData());
  // }

  //api integration



  private apiUrl = 'http://localhost:2000/group/groupbyid';

  constructor(private http: HttpClient) { }

  getAllGroupsByEmail(email: string): Observable<any> {
    

    const token = localStorage.getItem('LEAD_ID') || sessionStorage.getItem('LEAD_ID');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log("get group data by email local token:-" + token);


    
    return this.http.get(`http://localhost:2000/group/groupbyid?groupId=${email}`, { headers });
  }
};