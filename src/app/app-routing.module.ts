import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from "./form/form.component";
import {LoginComponent} from "./login/login.component";
import {DisplayDetailComponent} from "./display-detail/display-detail.component";
import {AuthGuard} from "./authentication/auth.guard";



const appRoutes: Routes=[
  { path: '', redirectTo:"login",pathMatch:"full"},
  { path: 'login' , component:LoginComponent},
  { path: 'form', component:FormComponent,canActivate:[AuthGuard] },
  { path: 'display-detail', component:DisplayDetailComponent,canActivate:[AuthGuard]}

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
