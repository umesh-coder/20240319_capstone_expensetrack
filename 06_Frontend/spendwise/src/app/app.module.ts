// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { CommonModule } from '@angular/common';

// // import { WelcomeComponent } from './component/welcome/welcome.component';
// // import { WelcomeComponent } from './component/welcome/welcome.component';
// // import { HomeComponent } from './component/home/home.component';
// // import { HeaderComponent } from './component/header/header.component';
// // import { SignupComponent } from './component/welcome/signup/signup.component';
// // import { LoginComponent } from './component/welcome/login/login.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     // WelcomeComponent,
//     // WelcomeComponent,
//     // HomeComponent,
//     // HeaderComponent,
//     // SignupComponent,
//     // LoginComponent
//   ],
//   imports: [
//     CommonModule,
//     BrowserModule,
//     AppRoutingModule,

//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


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


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
