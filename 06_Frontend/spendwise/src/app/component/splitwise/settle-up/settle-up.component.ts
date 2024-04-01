import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrl: './settle-up.component.scss',
})
export class SettleUpComponent {
  selectedPaymentMethod!: string;
  paymentMethods: string[] = ['Credit Card', 'PayPal', 'Bank Transfer'];

  constructor(public dialogRef: MatDialogRef<SettleUpComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Implement save logic here
    this.dialogRef.close();
  }
}
