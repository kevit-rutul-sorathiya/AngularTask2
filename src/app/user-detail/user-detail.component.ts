import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../services/data-storage.service";
import {DataTransferService} from "../services/data-transfer.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userDetailObject:any;
  userId:number=0;
  constructor(private  route:ActivatedRoute,
              private router:Router,
              private dataStorageService:DataStorageService,
              private dataTransferService:DataTransferService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res=>{this.userId=res['id']})
    this.dataStorageService.getSingleUserObject(this.userId).subscribe(res=>{
      this.userDetailObject=res;
    });

  }

  onEdit(objectID:number){
    this.dataTransferService.editedUserID=objectID;
    this.dataTransferService.editMode=true;
    this.router.navigate(['form'],{state:{userId:objectID}});
  }

  onDeleteUserObject(id:number){
    this.dataStorageService.deleteUserObject(id).subscribe(()=>alert("User successfully deleted"));
  }


}
