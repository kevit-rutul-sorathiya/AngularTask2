import { Component, OnInit } from '@angular/core';
import {DataTransferService} from "../data-transfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-display-detail',
  templateUrl: './display-detail.component.html',
  styleUrls: ['./display-detail.component.css']
})
export class DisplayDetailComponent implements OnInit {

  userArray: Array<any> = [];
  constructor(readonly dataTransferService:DataTransferService,private router:Router) {}

  ngOnInit(): void {
    this.userArray = this.dataTransferService.getUserArray()
  }

  onEdit(userID:number){
    this.dataTransferService.editedUserID=userID;
    this.dataTransferService.editMode=true;
    this.router.navigate(['form'],{state:{userId:userID}});
  }



}
