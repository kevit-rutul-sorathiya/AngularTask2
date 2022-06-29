import {DataStorageService} from "./data-storage.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class DataTransferService{
  editMode=false;
  userSelectedHobbieArray:Array<any>=[];
  editedUserID:number=0;

  constructor(private dataStorageService:DataStorageService) {}

  getUserObject(object : any){
    this.userSelectedHobbieArray=object.hobbies;
    object.hobbies=[];
    for(let i=0;i<this.userSelectedHobbieArray.length;i++){
      if(this.userSelectedHobbieArray[i].checked){
        object.hobbies.push(this.userSelectedHobbieArray[i].name);
      }
    }
    this.dataStorageService.postUserObjectOnServer(object)
  }

  modifiedUserObject(object:any,id:number){
    object.id=id;
    this.userSelectedHobbieArray=object.hobbies;
    object.hobbies=[];
    for(let i=0;i<this.userSelectedHobbieArray.length;i++){
      if(this.userSelectedHobbieArray[i].checked){
        object.hobbies.push(this.userSelectedHobbieArray[i].name);
      }
    }
    this.dataStorageService.updateSingleUSerObject(object);

  }

}
