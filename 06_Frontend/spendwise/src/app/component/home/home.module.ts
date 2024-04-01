
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import {
  Confirm,
  ViewExpensesComponent,
} from './view-expenses/view-expenses.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewSingleComponent } from './view-single/view-single.component';
import { ShowChartComponent } from './show-chart/show-chart.component';
import {MatListModule} from '@angular/material/list';
import { GroupExpenseScreenComponent } from '../splitwise/group-expense-screen/group-expense-screen.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'Dashboard | SpendWise'
  },
  {
    path:'group-expense',
    component:GroupExpenseScreenComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    ViewExpensesComponent,
    Confirm,
    ViewSingleComponent,
    ShowChartComponent,
    // CreateGroupDialogComponent
  ],

  imports: [CommonModule, SharedModule, RouterModule.forChild(routes),MatListModule],
})
export class HomeModule { }
