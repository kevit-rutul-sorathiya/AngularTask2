import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class DataStorageService{

  url:string="http://localhost:3000/users";
  constructor(private http:HttpClient) {}

  getUserArray(){
    return this.http.get(this.url);
  }

  postUserObjectOnServer(object:any){
    this.http.post(this.url,object).subscribe(res=>console.log(res));
  }

  getSingleUserObject(id:number): Observable<any>{
    return this.http.get<any>(this.url+"/"+id)
  }

  updateSingleUSerObject(object:any){
    this.http.put(this.url+"/"+object.id,object).subscribe(res=>console.log(res))
  }

  deleteUserObject(id:number){
    return this.http.delete(this.url+"/"+id)
  }

}


