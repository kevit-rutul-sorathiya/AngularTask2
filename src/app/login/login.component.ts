import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidInputField : boolean = false;
  emptyInputField : boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {}

  onSubmit(form:NgForm){
      if(form.value.email.length === 0 || form.value.password.length ===0 ){
          this.emptyInputField = true;
      }else if(form.value.email === 'rutul.sorathiya@kevit.io' && form.value.password ===  '12345' ){
          this.router.navigate(['form'])
      }else{
          this.invalidInputField=true;
      }
  }

}
