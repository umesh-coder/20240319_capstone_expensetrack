import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  groupID:any;
  GM:any;
  

  setData(data: any,groupmem:any): void {
    this.groupID = data;
    this.GM = groupmem;
  }
}
