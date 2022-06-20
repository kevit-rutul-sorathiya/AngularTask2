import { Component, OnInit } from '@angular/core';
import {DataTransferService} from "../data-transfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-detail',
  templateUrl: './display-detail.component.html',
  styleUrls: ['./display-detail.component.css']
})
export class DisplayDetailComponent implements OnInit {

  s:string='';
  userArray: Array<any> = [];
  constructor(readonly dataTransferService:DataTransferService,private router:Router) {
  }

  ngOnInit(): void {
    this.userArray = this.dataTransferService.getArray()

    for(let i=0;i<this.userArray.length;i++) {
      this.s='';
      for(let j=0;j<this.userArray[i].hobbies.length;j++) {
        if (this.userArray[i].hobbies[j].checked) {
          this.s += this.userArray[i].hobbies[j].name+'  ';
        }
      }
    }
  }

  onEdit(userID:number){
        console.log(userID);
      this.dataTransferService.editMode=true;
      this.router.navigate(['form'],{state:{id:userID}});
    // this.dataTransferService.userEdit.next(userID);

  }

}
