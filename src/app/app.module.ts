import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DisplayDetailComponent } from './display-detail/display-detail.component';
import {DataTransferService} from "./services/data-transfer.service";
import {HttpClientModule} from "@angular/common/http";
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    DisplayDetailComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
