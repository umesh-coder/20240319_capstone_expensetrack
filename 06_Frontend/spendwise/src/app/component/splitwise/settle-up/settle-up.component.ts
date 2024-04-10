import { Component,Input  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrl: './settle-up.component.scss',
})
export class SettleUpComponent {
  token: string | null = localStorage.getItem('LEAD_ID');
  selectedPaymentMethod!: string;
  paymentMethods: string[] = ['Credit Card', 'PayPal', 'Bank Transfer'];
  @Input() expenseId: any;

  constructor(public dialogRef: MatDialogRef<SettleUpComponent>,private http: HttpClient) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Make the API call to update expense status
    const expenseId = this.expenseId; // Replace 'your_expense_id' with the actual expense ID
    this.updateExpenseStatus(expenseId).subscribe({
      next: (response: any) => {
        console.log('Expense status updated successfully:', response);
        // Close the dialog
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.error('Error updating expense status:', error);
        // Handle error as needed
      }
    });
    this.dialogRef.close();
  }

  updateExpenseStatus(expenseId: string) {
    // Construct request headers with authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}` // Replace 'your_token_here' with the actual JWT token
    });

    // Make the API call
    return this.http.post<any>(
      `http://localhost:2000/groupExpense/updateStatus?expenseId=${expenseId}`,
      { headers }
    );
  }
}
