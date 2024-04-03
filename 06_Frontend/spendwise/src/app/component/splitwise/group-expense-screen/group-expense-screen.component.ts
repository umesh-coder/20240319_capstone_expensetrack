import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlertBoxComponent } from '../../../shared/alert-box/alert-box.component';
import { SettleUpComponent } from '../settle-up/settle-up.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ActivityComponent } from '../activity/activity.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-expense-screen',
  templateUrl: './group-expense-screen.component.html',
  styleUrl: './group-expense-screen.component.scss',
})
export class GroupExpenseScreenComponent {
  @Input() groupMembers: string[] = [];
  groupID: string = '';

  showDialog: boolean = false;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    console.log(this.groupID);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.groupID = params['id'];
      this.groupName = this.groupID
    });
  }

  onLogout() {
    this.dialog.open(AlertBoxComponent, {
      data: { type: 'alert' },
    });
  }

  groupName: String ='';
  totalAmount: Number = 5000;
  amountOwed: Number = 1000;
  amountOwedToYou: Number = 20;

  openSettleUpDialog(): void {
    this.dialog.open(SettleUpComponent, {
      width: '400px',
    });
  }
  openAddExpenseDialog(): void {
    this.dialog.open(AddExpenseComponent, {
      width: '400px',
    });
  }

  openActivity(): void {}
}
