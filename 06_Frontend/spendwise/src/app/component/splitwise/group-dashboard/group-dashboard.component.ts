import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessDataService } from '../../../services/business-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseContent } from '../../home/view-expenses/view-expense.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/auth.service';
import { ViewSingleComponent } from '../../home/view-single/view-single.component';
import { ShowChartComponent } from '../../home/show-chart/show-chart.component';
import { ActivatedRoute } from '@angular/router';

import { groupDashboardService } from '../../../services/groupo-dashboard.service';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrl: './group-dashboard.component.scss',
})
export class GroupDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  groupID: string = '';

  showDialog: boolean = false;

  displayedColumns: string[] = [
    'name',
    'amount',
    'expense_date',
    'expense_category',
    'payment',
    'comment',
  ];

  ELEMENT_DATA: ExpenseContent[] = [];
  userId: any;
  isLoading: boolean = true;
  isDelete: boolean = false;
  dataSource = new MatTableDataSource<ExpenseContent>();
  constructor(
    public businessData: BusinessDataService,
    public dialog: MatDialog,
    public http: HttpClient,
    public route: Router,
    public authServ: AuthService,
    public _snackBar: MatSnackBar,
    private router: ActivatedRoute,

    public groupData: groupDashboardService
  ) {
    this.userId = sessionStorage.getItem('Id')?.split(' ')[1];
  }

  cards: any = [];
  allexpense: any = 0;
  count: any = 0;
  ngOnInit(): void {
    this.isLoading = true;
    this.isDelete = false;
    this.userId = sessionStorage.getItem('Id')?.split(' ')[1];
    this.getAllExpense(this.groupID);

    this.router.queryParams.subscribe((params) => {
      this.groupID = params['id'];
    });
  }
  onHome() {
    this.route.navigate(['home']);
  }
  public updateExpene() {
    let body = {
      expenseLogged: this.businessData.expensesLogged
        ? this.businessData.expensesLogged
        : 0,
    };
    console.log('update expense' + this.userId, body);

    this.authServ.updateUserData(this.userId, body);
  }

  public getAllExpense(id: any) {
    this.groupData.onGetAllExpense(id).subscribe(
      (res: any) => {
        // console.log("aa gya" + res.data[0].expense_date);
        this.ELEMENT_DATA = res.data;
        this.dataSource = new MatTableDataSource<ExpenseContent>(
          this.ELEMENT_DATA
        );
        this.count = 0;
        let len = res.data.length;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 5000);
        this.cards = [
          {
            icon: 'today',
            title: 'First Expense Date',
            content: len > 0 ? res.data[0].expense_date : '-',
          },
          {
            icon: 'today',
            title: 'Latest Expense Date',
            content: len > 0 ? res.data[res.data.length - 1].expense_date : '-',
          },
          {
            icon: 'numbers',
            title: 'Number of Expenses',
            content: len,
          },
          {
            icon: 'monetization_on',
            title: 'Total Amount',
            content: '₹' + this.count,
          },
        ];
        this.allexpense = len;
        this.businessData.expensesLogged = this.allexpense;

        this.updateExpene();
        this.pieChartData(res.data);
        this.onBarChartEdit(res.data);
        setTimeout(() => {
          this.isLoading = false;
        }, 4000);
      },
      (error) => {
        this._snackBar.open('Session Expired!!', '', { duration: 2000 });
        this.authServ.onLogout();
      }
    );
  }

  //logic of pie chart
  cate: any;
  hashMap: any = {};
  public pieChartData(data: any) {
    this.businessData.pieLabels = [];
    this.businessData.piedata = [];
    this.hashMap = {};
    this.count = 0;

    if (data) {
      // console.log("data:-" + data[4].amount);

      this.businessData.onGetAllCategory().subscribe((res: any) => {
        this.cate = res.data;

        for (let i = 0; i < this.cate.length; i++) {
          this.hashMap[this.cate[i]] = 0;
        }
        for (let i = 0; i < data.length; i++) {
          this.hashMap[data[i].expense_category] += data[i].amount;
        }

        for (let key in this.hashMap) {
          if (this.hashMap[key] != 0) {
            this.businessData.pieLabels.push(key);
            this.businessData.piedata.push(this.hashMap[key]);
            this.count += this.hashMap[key];
          }
        }

        // this.count = 200

        this.cards[3].content = '₹' + this.count;
      });
    }
  }

  openPieChart() {
    this.businessData.chartType = 'pie';
    let pieDialogRef = this.dialog.open(ShowChartComponent, {
      width: '500px',
      height: '400px',
    });
    this.businessData.pieDialogRef = pieDialogRef;
  }
  // pie chart logic ends

  //bar charts logic
  onBarChartEdit(data: any) {
    let hashmap: any = {};
    for (let i = 0; i < data.length; i++) {
      let date = data[i].expense_date.toString().split(' ');
      hashmap[date[3]] = [];
    }
    for (let i = 0; i < data.length; i++) {
      let date = data[i].expense_date.toString().split(' ');
      hashmap[date[3]].push([date[1], data[i].amount]);
    }
    this.businessData.hashmap = hashmap;
    console.log(hashmap);
  }

  openBarChart() {
    this.businessData.chartType = 'bar';
    let dialogRef = this.dialog.open(ShowChartComponent, {
      width: '700px',
      height: '450px',
    });
  }
}
