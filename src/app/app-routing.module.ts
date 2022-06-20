import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from "./form/form.component";
import {LoginComponent} from "./login/login.component";
import {DisplayDetailComponent} from "./display-detail/display-detail.component";



const appRoutes: Routes=[
  { path: '' , component:LoginComponent},
  { path: 'form', component:FormComponent },
  { path: 'display-detail', component:DisplayDetailComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
