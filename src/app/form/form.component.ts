import {Component, ElementRef, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataTransferService} from "../services/data-transfer.service";
import {userDetailObject} from './userDetailObject';
import {DataStorageService} from "../services/data-storage.service";

declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userArray: any = [];
  userDetailObject: userDetailObject = {
    name: '',
    dob: '',
    address: '',
    gender: '',
    hobbies: [],
    email: '',
    phoneNumber: '',
    schoolName: '',
    sscPercentage: '',
    hscPercentage: '',
    collegeName: '',
    btechCGPA: '',
    mtechCGPA: '',
    summary: ''
  }
  todayDate = new Date().toISOString().split("T")[0];
  Hobbies = [
    {
      name: 'cricket',
      checked: false
    },
    {
      name: 'Basketball',
      checked: false
    },
    {
      name: 'Football',
      checked: false
    },
    {
      name: 'Tabletennis',
      checked: false
    },
    {
      name: 'Hockey',
      checked: false
    }]
  submitted = false;
  userDetailForm !: FormGroup;
  userId: number = 0;
  arrayIndex: number = 0;


  constructor(private router: Router,
              private dataTransferService: DataTransferService,
              private dataStorageService: DataStorageService) {
    this.initForm();
    this._patchValues();

    if (dataTransferService.editMode) {
      // @ts-ignore
      this.userId = this.router.getCurrentNavigation().extras.state.userId;
      this.dataStorageService.getSingleUserObject(this.userId).subscribe(
        (userObject) => {
          this.userId=userObject.id;
          for (let hobbie of this.Hobbies) {
            for (let selectedHobbie of userObject.hobbies) {
              if (hobbie.name === selectedHobbie) {
                hobbie.checked = true;
              }
            }
          }
          userObject.hobbies = this.Hobbies;
          this.userDetailForm.patchValue(userObject)
        }
      )
    }
  }

  ngOnInit(): void {
  }

  private initForm() {
    this.userDetailForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*$')]
      ),
      'dob': new FormControl(
        '',
        Validators.required
      ),
      'address': new FormControl(
        ''
      ),
      'gender': new FormControl(
        '',
        Validators.required
      ),
      'hobbies': new FormArray(
        []
      ),
      'email': new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      'phoneNumber': new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(10)]
      ),
      'schoolName': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*$')]
      ),
      'sscPercentage': new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          // ^100(\.[0]{1,2})?|([0-9]|[1-9][0-9])(\.[0-9]{1,2})?$
          Validators.pattern('^(35|36|37|38|39|[4-9][0-9]([.][0-9]{1,2})*|100)$')]
      ),
      'hscPercentage': new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern('^(35|36|37|38|39|[4-9][0-9]([.][0-9]{1,2})*|100)$')]
      ),
      'collegeName': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]
      ),
      'btechCGPA': new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.pattern('[0-9]{1}\\.[0-9]+|10.0$')]
      ),
      'mtechCGPA': new FormControl(
        '',
        [
          Validators.maxLength(4),
          Validators.pattern('[0-9]{1}\\.[0-9]+|10.0$')
        ]
      ),
      'summary': new FormControl(
        ''
      )
    })
  }

  onSubmit() {
    if (!this.userDetailForm.valid) {
      this.submitted = true;
      alert('Enter appropriate details');
    } else if (this.dataTransferService.editMode) {
      this.dataTransferService.modifiedUserObject(this.userDetailForm.value,this.userId);
      this.router.navigate(['display-detail']);
      this.dataTransferService.editMode = false;
    } else {
      this.userDetailObject = this.userDetailForm.value;
      this.dataTransferService.getUserObject(this.userDetailObject)
      this.router.navigate(['display-detail']);
    }
  }

  onReset() {
    this.userDetailForm.reset();
  }

  get formControls() {
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

  showDatePicker() {
    (document.getElementById("dob") as any).showPicker();
  }
}

