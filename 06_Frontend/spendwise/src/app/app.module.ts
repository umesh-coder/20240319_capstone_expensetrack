
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateGroupDialogComponent } from './component/splitwise/create-group-dialog/create-group-dialog.component';
import { GroupExpenseScreenComponent } from './component/splitwise/group-expense-screen/group-expense-screen.component';
import { TableModule } from 'primeng/table';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import {  MatDividerModule } from '@angular/material/divider';
import { SettleUpComponent } from './component/splitwise/settle-up/settle-up.component';
import { AddExpenseComponent } from './component/splitwise/add-expense/add-expense.component';
import { EqualSplitComponent } from './component/splitwise/equal-split/equal-split.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UnequalSplitComponent } from './component/splitwise/unequal-split/unequal-split.component';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, CreateGroupDialogComponent, GroupExpenseScreenComponent, SettleUpComponent, AddExpenseComponent, EqualSplitComponent, UnequalSplitComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    MatNavList,
    MatDividerModule,MatListItem,MatList,MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
