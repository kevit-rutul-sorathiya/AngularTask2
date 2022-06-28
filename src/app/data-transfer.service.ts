export class DataTransferService{
  userDetailArray :any = []
  editMode=false;
  userID:number=0;
  userSelectedHobbieArray:Array<any>=[];
  editedUserID:number=0;

  getUserObject(object : any){
    object.userId= ++this.userID;
    this.userSelectedHobbieArray=object.hobbies;
    object.hobbies=[];
    for(let i=0;i<this.userSelectedHobbieArray.length;i++){
      if(this.userSelectedHobbieArray[i].checked){
        object.hobbies.push(this.userSelectedHobbieArray[i].name);
      }
    }
    this.userDetailArray.push(object);
  }

  getUserArray(){
    return this.userDetailArray;
  }

  modifiedUserObject(index:number,object:any){
    this.userDetailArray[index].userId=this.editedUserID;
    this.userSelectedHobbieArray=object.hobbies;
    object.hobbies=[];
    for(let i=0;i<this.userSelectedHobbieArray.length;i++){
      if(this.userSelectedHobbieArray[i].checked){
        object.hobbies.push(this.userSelectedHobbieArray[i].name);
      }
    }
    this.userDetailArray[index]=object;
  }

}
