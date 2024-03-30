import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EqualSplitComponent } from '../equal-split/equal-split.component';
import { AutoFocus } from 'primeng/autofocus';
import { UnequalSplitComponent } from '../unequal-split/unequal-split.component';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  splitType!: string;
  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    private dialog: MatDialog
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Implement save logic here
    this.dialogRef.close();
  }

  dialogRefs: any;

  openEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(EqualSplitComponent, {
      width: '400px',
      position: { right:'20px', top: '20px' } // Adjust position as needed
    });
  }

  openUnEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(UnequalSplitComponent, {
      width: '500px',
      position: { right:'20px', top: '20px' } // Adjust position as needed
    });
  }
  
}
