import {Subject} from "rxjs";


export class DataTransferService{
  userDetailArray : string[] = []
  editMode=false;
  userEdit = new Subject<number>();
  id:number=1;


  getObject(object : any){
    this.userDetailArray.push(object);
  }

  getArray(){
    return this.userDetailArray;
  }


}
