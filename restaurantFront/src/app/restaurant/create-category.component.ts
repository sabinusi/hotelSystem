import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import { StoreService } from './store.service';
import {MessagesService} from 'ng2-messages/ng2-messages';

@Component({
  selector: 'app-create-category',
  template: `
    <h3><b style="color: blue;font-size: 20px;">CreateCategory &emsp;</b></h3>
    <br>
    <div class="row">
      <div class="col-md-4"><button class="btn btn-primary"  (click)="save()">save</button> <button class="btn btn-default" (click)="discard()">discard</button> 
        
      </div>
      <div class="col-md-6"><ng2-messages></ng2-messages></div>
      <div class="col-md-2"></div>
    </div>
    <hr>

      <ul class="list-group" style="box-shadow: 2px 2px 2px 2px;">
        <li class="list-group-item " style="text-align: center;">
        
        <div class="row">
          <div class="col-md-3 col-md-pull-2" style="border-right: 1px solid black">
            Name
          </div>
          <div class="col-md-6">

            <input type="text" [(ngModel)]="name" name="name" class="form-control">
          </div>
        </div>
        <div class="row" style="margin-top: 20px;">
          <div class="col-md-3 col-md-pull-2" style="border-right: 1px solid black">
            Image
          </div>
          <div class="col-md-6">
            <input type="file"  (change)="getRFiles($event)" accept="image/*" class="form-control"><span class="glyphicon glyphicon-camera"></span>
          </div>
        </div>

        </li>
       
      </ul>
       
      
      
  `,
  styles: [`

  `],
  providers:[StoreService]
})
export class CreateCategoryComponent implements OnInit {

  constructor(private _location: Location,private service:StoreService,public msg:MessagesService) { }

  ngOnInit() {
  }
  private name:any;
   newfiles : FileList; 
       getRFiles(event){ 
           this.newfiles = event.target.files; 
       }
    discard(){
    this._location.back();

  }
  save(){

   if (this.name != undefined) {
     if (this.newfiles == undefined) {
       this.service.createCategory("",this.name).subscribe(
         resp=>{
           alert('Category created succesfull')
           this._location.back();
         },Error=>{
           if (Error.status == 400) {
             this.msg.info("category with this name already existed");
           }
         }
         )
     }else
     this.service.createCategory(this.newfiles[0],this.name).subscribe(
       resp=>{
         alert('Category created succesfull')
         this._location.back();
       },Error=>{
           if (Error.status == 400) {
             this.msg.info("category with this name already existed");
           }
         })
   }else{
          this.msg.error("please fill name field");
   }



  }
 
}
