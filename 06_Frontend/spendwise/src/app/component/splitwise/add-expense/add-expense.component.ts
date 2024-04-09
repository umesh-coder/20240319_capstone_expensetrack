import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EqualSplitComponent } from '../equal-split/equal-split.component';
import { AutoFocus } from 'primeng/autofocus';
import { UnequalSplitComponent } from '../unequal-split/unequal-split.component';
import { ExpensesService } from '../../../services/expenses.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BusinessDataService } from '../../../services/business-data.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})


export class AddExpenseComponent implements OnInit {
  splitType!: string;
  expenseForm!: FormGroup;
  @Input() tags: any = [];
  keywords: any = [];
  maxDate: any = new Date();
  date: any;


  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    private dialog: MatDialog,
    public expenseservice: ExpensesService,
    public businessData: BusinessDataService,
    public formBuilder: FormBuilder

  ) { }


  ngOnInit(): void {


    this.expenseForm = this.formBuilder.group({
      expense_name: [''],
      price: [''],
      paid_by: [''],
      split_type: ['equally'], // Default split type
      expense_category: [''],
      expense_date: ['']
    });

    console.log("data of expense" + this.expenseForm);


    this.businessData.onGetAllCategory().subscribe((res: any) => {
      this.keywords = res.data;
    })

  }



  onCancel(): void {
    this.dialogRef.close();


  }

  onSave(): void {




    const date = (this.expenseForm.value.expense_date).toString();

    console.log("tarikh " + this.expenseForm.value.expense_category);



    const groupId = '660b94360553dbb165ebd78a'; // Replace with your actual group ID
    const expenseData = {
      "name": this.expenseForm.value.expense_name,
      "amount": this.expenseForm.value.price,
      "expense_date": date.substring(0, 15),
      "expense_category": this.expenseForm.value.expense_category,
      "payment": "Done By the User",
      "comment": "Done By the User",
      "split_members": [
        { "member_id": "60f6de8066b1c12288a86328", "shareamount": 40, "status": "Pending", },
        { "member_id": "60f6de8066b1c12288a8632a", "shareamount": 40, "status": "Pending", }
      ],
    };


    this.expenseservice.createExpense(groupId, expenseData).subscribe(
      response => {
        console.log('Expense created successfully:', response);
      },
      error => {
        console.error('Error creating expense:', error);
      }
    );

    // Implement save logic here
    this.dialogRef.close();
  }

  dialogRefs: any;

  openEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(EqualSplitComponent, {
      width: '400px',
      position: { right: '20px', top: '20px' } // Adjust position as needed
    });
  }

  openUnEquallySplitDialog(): void {
    this.dialogRefs = this.dialog.open(UnequalSplitComponent, {
      width: '500px',
      position: { right: '20px', top: '20px' } // Adjust position as needed
    });
  }

  calculateExpensePerPerson(): number {
    // const totalPrice = this.expenseForm.get('price').value || 0;4
    const totalPrice = 100;
    const numberOfParticipants = 5; // You need to get the actual number of participants from your data
    return totalPrice / numberOfParticipants;
  }

  addEvent(event: any) {
    let str = event.value.toString();
    this.date = str.split(' ');
  }

}
