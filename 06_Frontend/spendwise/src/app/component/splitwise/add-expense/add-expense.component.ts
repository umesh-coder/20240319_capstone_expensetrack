import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EqualSplitComponent } from '../equal-split/equal-split.component';
import { AutoFocus } from 'primeng/autofocus';
import { UnequalSplitComponent } from '../unequal-split/unequal-split.component';
import {ExpensesService} from '../../../services/expenses.service';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  splitType!: string;
  description: string = '';
  price: number = 0;
  paidBy: string = ''; // You can set the default paidBy value as needed
  expenseDate: Date = new Date(); // You can set the default date as needed
  name:string=''

  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    private dialog: MatDialog,
    private expensesService: ExpensesService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Prepare the expense data object
    const expenseData = {
      name: this.description,
      amount: this.price,
      expense_date: this.expenseDate,
      expense_category: '', // You can add the category if needed
      payment: this.paidBy,
      comment: '', // You can add the comment if needed
      split_members: [], // You need to implement split members logic
    };

    // Call the service method to create the expense
    this.expensesService.createExpense(expenseData).subscribe({
      next: (response) => {
        console.log('Expense created successfully:', response);
        // Handle success, if needed
      },
      error: (error) => {
        console.error('Error creating expense:', error);
        // Handle error, if needed
      },
    });

    this.dialogRef.close();
  }

  dialogRefs: any;

  openEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(EqualSplitComponent, {
      width: '400px',
      position: { right: '20px', top: '20px' },
    });
  }

  openUnEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(UnequalSplitComponent, {
      width: '500px',
      position: { right: '20px', top: '20px' },
    });
  }
}
