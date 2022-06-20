import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DisplayDetailComponent } from './display-detail/display-detail.component';
import {DataTransferService} from "./data-transfer.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    DisplayDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
