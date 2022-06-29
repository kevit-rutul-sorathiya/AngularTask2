import { Component, OnInit } from '@angular/core';
import {DataTransferService} from "../services/data-transfer.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DataStorageService} from "../services/data-storage.service";

@Component({
  selector: 'app-display-detail',
  templateUrl: './display-detail.component.html',
  styleUrls: ['./display-detail.component.css']
})
export class DisplayDetailComponent implements OnInit {

  userArray:any = [];
  constructor(readonly dataTransferService:DataTransferService,
              private router:Router,
              private dataStorageService:DataStorageService) {

  }

  ngOnInit(): void {
    console.log("init")
    this.dataStorageService.getUserArray().subscribe(userArray=>{
      console.log("event", userArray);
      this.userArray = userArray;
    })
  }

  onEdit(objectID:number){
    this.dataTransferService.editedUserID=objectID;
    this.dataTransferService.editMode=true;
    this.router.navigate(['form'],{state:{userId:objectID}});
  }

  onDeleteUserObject(id:number){
    this.dataStorageService.deleteUserObject(id).subscribe(()=>alert("User successfully deleted"));
    this.dataStorageService.getUserArray().subscribe(userArray=>{
      this.userArray = userArray;
    })
  }


}
