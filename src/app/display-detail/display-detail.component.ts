import { Component, OnInit } from '@angular/core';
import {DataTransferService} from "../services/data-transfer.service";
import {ActivatedRoute, Router} from "@angular/router";
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
              private  route:ActivatedRoute,
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

  onUserDetail(id:number){
    this.router.navigate(['user-detail'],{queryParams:{id:id}})
  }

  onClickBackButton(){
    this.router.navigate(['form']);
  }
}
