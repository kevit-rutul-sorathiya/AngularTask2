import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataTransferService} from "../data-transfer.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  uerArray : any =[];
  userDetailObject : userDetailObject = {
    userID:0,
    name:'',
    birthDate:'',
    address:'',
    gender: '',
    hobbies:'',
    email: '',
    phoneNumber:'',
    schoolName:'',
    sscPercentage:'',
    hscPercentage: '',
    collegeName:'',
    btechCGPA:'',
    mtechCGPA: '',
    summary:''
  }

  Hobbies=[
    {
      name: 'cricket',
      checked: false
    },
    {
      name:'Basketball',
      checked: false
    },
    {
      name:'Football',
      checked: false
    },
    {
      name:'Tabletennis',
      checked:false
    },
    {
      name:'Hockey',
      checked:false
    }]

  submitted = false;
  userDetailForm !: FormGroup;

  userId: number =0;
  arrayIndex:number=0;


  constructor(private router:Router,private dataTransferService:DataTransferService) {
    this.initForm();
    this._patchValues();

    if(dataTransferService.editMode){

      // @ts-ignore
      this.userId=this.router.getCurrentNavigation().extras.state.id
      console.log(this.userId)
      this.uerArray= dataTransferService.getArray()
      console.log(this.uerArray)
        for(let i=0;i<this.uerArray.length;i++){
          console.log("hi")
          console.log(this.uerArray.length)
          if(this.uerArray[i].userID === this.userId){
            this.arrayIndex=i;
            this.userDetailForm.setValue({
              name:this.uerArray[i].name,
              dob:this.uerArray[i].birthDate,
              address:this.uerArray[i].address,
              gender:this.uerArray[i].gender,
              hobbies:this.uerArray[i].hobbies,
              email:this.uerArray[i].email,
              phoneNumber:this.uerArray[i].phoneNumber,
              schoolName:this.uerArray[i].schoolName,
              sscPercentage:this.uerArray[i].sscPercentage,
              hscPercentage:this.uerArray[i].hscPercentage,
              collegeName:this.uerArray[i].collegeName,
              btechCGPA:this.uerArray[i].btechCGPA,
              mtechCGPA:this.uerArray[i].mtechCGPA,
              summary:this.uerArray[i].summary
            })
            break;
          }
        }
    }
  }

  ngOnInit(): void {

  }

  private initForm(){
    this.userDetailForm=new FormGroup({
      'name':new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
      'dob':new FormControl('',Validators.required),
      'address':new FormControl(''),
      'gender':new FormControl('',Validators.required),
      'hobbies':new FormArray([]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'phoneNumber':new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10)]),
      'schoolName':new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
      'sscPercentage':new FormControl('',[Validators.required,Validators.pattern('([1-9]|[1-9][0-9]|100)')]),
      'hscPercentage':new FormControl('',[Validators.required,Validators.pattern('([1-9]|[1-9][0-9]|100)')]),
      'collegeName':new FormControl( '',[Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
      'btechCGPA':new FormControl('',[Validators.required,Validators.pattern('^[0-9]+\\.[0-9]+$')]),
      'mtechCGPA':new FormControl('',Validators.pattern('^[0-9]+\\.[0-9]+$')),
      'summary':new FormControl('')
    })
  }

  onSubmit() {
    if(!this.userDetailForm.valid){
      this.submitted=true
      alert('Enter appropriate details')
    }else if(this.dataTransferService.editMode){
      this.uerArray[this.arrayIndex].name =  this.userDetailForm.value['name']
      this.uerArray[this.arrayIndex].dob = this.userDetailForm.value['dob']
      this.uerArray[this.arrayIndex].address = this.userDetailForm.value['address']
      this.uerArray[this.arrayIndex].gender = this.userDetailForm.value['gender']
      this.uerArray[this.arrayIndex].hobbies = this.userDetailForm.value['hobbies']
      this.uerArray[this.arrayIndex].email = this.userDetailForm.value['email']
      this.uerArray[this.arrayIndex].phoneNumber = this.userDetailForm.value['phoneNumber']
      this.uerArray[this.arrayIndex].schoolName = this.userDetailForm.value['schoolName']
      this.uerArray[this.arrayIndex].sscPercentage = this.userDetailForm.value['sscPercentage']
      this.uerArray[this.arrayIndex].hscPercentage = this.userDetailForm.value['hscPercentage']
      this.uerArray[this.arrayIndex].collegeName = this.userDetailForm.value['collegeName']
      this.uerArray[this.arrayIndex].btechCGPA = this.userDetailForm.value['btechCGPA']
      this.uerArray[this.arrayIndex].mtechCGPA = this.userDetailForm.value['mtechCGPA']
      this.uerArray[this.arrayIndex].summary = this.userDetailForm.value['summary']
      this.router.navigate(['display-detail']);
      this.dataTransferService.editMode=false;
    } else {
      this.userDetailObject.userID=this.dataTransferService.id;
      console.log(this.userDetailObject.userID)
      this.userDetailObject.name = this.userDetailForm.value['name']
      this.userDetailObject.birthDate = this.userDetailForm.value['dob']
      this.userDetailObject.address = this.userDetailForm.value['address']
      this.userDetailObject.gender = this.userDetailForm.value['gender']
      this.userDetailObject.hobbies = this.userDetailForm.value['hobbies']
      this.userDetailObject.email = this.userDetailForm.value['email']
      this.userDetailObject.phoneNumber = this.userDetailForm.value['phoneNumber']
      this.userDetailObject.schoolName = this.userDetailForm.value['schoolName']
      this.userDetailObject.sscPercentage = this.userDetailForm.value['sscPercentage']
      this.userDetailObject.hscPercentage = this.userDetailForm.value['hscPercentage']
      this.userDetailObject.collegeName = this.userDetailForm.value['collegeName']
      this.userDetailObject.btechCGPA = this.userDetailForm.value['btechCGPA']
      this.userDetailObject.mtechCGPA = this.userDetailForm.value['mtechCGPA']
      this.userDetailObject.summary = this.userDetailForm.value['summary']
      this.dataTransferService.getObject(this.userDetailObject)
      this.router.navigate(['display-detail']);
      this.dataTransferService.id++;
    }
  }

  onReset(){
    this.userDetailForm.reset();
  }

  get f() {
    return this.userDetailForm.controls;
  }

  private _patchValues(): void {
    const formArray = this.userDetailForm.get('hobbies') as FormArray;
    this.Hobbies.forEach((hobbie) => {
      formArray.push(
        new FormGroup({
          name: new FormControl(hobbie.name),
          checked: new FormControl(hobbie.checked),
        })
      );
    });
  }

}
