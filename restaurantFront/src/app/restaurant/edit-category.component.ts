import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {StoreService} from './store.service';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import {NgProgressService} from "ng2-progressbar";
import {MessagesService} from 'ng2-messages/ng2-messages';
@Component({
  selector: 'app-edit-category',
  template: `
   <div class="container-fluid" >
     <p><b style="color: blue;font-size: 20px">EditCategory /</b>{{oldname}} </p>
     <div class="row">
       <div class="col-md-10">
         <button class="btn btn-primary" (click)="save()">save</button>
         <button class="btn btn-default" (click)="discard()">Return</button>
         <ng2-messages></ng2-messages>
       </div>
       <div class="col-md-2"> <button class="btn btn-danger"  (click)="delete()">delete</button> </div>
     </div>
     <hr>
     <div class="row" >
       <div class="col-md-12" class="for">
         <div class="formc">
         <img src="{{name.pic}}" alt="" class="img img-responsive" >
         <img src="./assets/def.jpg" alt="" class="img img-responsive" *ngIf="!name.pic" >
         </div>
         <br>
         <div class="row">
           <div class="col-md-12">
             
          
         <ul class="list-group">
           <li class="list-group-item " style="text-align: center;">
           
           <div class="row">
             <div class="col-md-3 " style="border-right: 1px solid black">
               Name
             </div>
             <div class="col-md-9" >
               <input type="text" [(ngModel)]="updateName" disabled placeholder="{{oldname}}" class="form-control">
             </div>
           </div>
           <div class="row" style="margin-top: 20px;">
             <div class="col-md-3 " style="border-right: 1px solid black">
               Image
             </div>
             <div class="col-md-9">
               <input type="file" (change)="getRFiles($event)" accept="image/*" class="form-control"><span class="glyphicon glyphicon-camera"></span>
             </div>
           </div>

           </li>
          
         </ul>
          </div>
         </div>
       </div>
       
     </div>
   </div>
  `,
  styles: [`
  .formc{
  max-height: 100px;
  max-width: 120px;
  vertical-align: middle;
   }
  .for{
  min-width: 100%;
  max-width: 100%;
  min-height: 330px;
  
  border: 1px solid #c8c8d3;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  background: white;
}


  `],
  providers:[StoreService]
})
export class EditCategoryComponent implements OnInit {

  constructor(private pService: NgProgressService,public msg:MessagesService,private activatedRoute:ActivatedRoute,private service:StoreService,private _location: Location) { }
private name;
private updateName;
private oldname;
  ngOnInit() {
      this.activatedRoute.params.subscribe((params: Params) => {
             let userId = params['name'];
             this.oldname=userId
           this.service.RetriveCategory(userId).subscribe(
             resp=>{this.name=resp})
           
    })
  }
   newfiles : FileList; 
       getRFiles(event){ 
           this.newfiles = event.target.files; 
       }
  
  discard(){
  this._location.back();
  }
  save(){


if (this.newfiles!=undefined){
  this.pService.start();
this.service.updateCategory(this.oldname,this.newfiles[0]).subscribe(
  resp=>{
    alert('succesfull update')
    this.pService.done();
    this._location.back();
  })
}else{
  this.msg.warning("please choose image");
}
}
delete(){
  this.pService.start();
  this.service.deleteCategory(this.oldname).subscribe(
    resp=>{alert("succesfull delete")
    this.pService.done();
    this._location.back();
  })
}

}
