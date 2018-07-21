import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import { StoreService } from './store.service';
import {NgProgressService} from "ng2-progressbar";
import {MessagesService} from 'ng2-messages/ng2-messages';

@Component({
  selector: 'app-create',
  template: `
  
  <h3><b style="color: blue;font-size: 20px;">CreateProduct &emsp;</b></h3>
    <br>
    <div class="row">
      <div class="col-md-4"><button class="btn btn-primary" (click)="save()">save</button> <button class="btn btn-default" (click)="discard()">Return</button> 
        
      </div>
      <div class="col-md-6"><ng2-messages></ng2-messages></div>
      <div class="col-md-2"></div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-12 form">
        <div class="row" >
          <div class="col-md-4 ">
            
              
              <h2>
                <label for="">Product Name</label>
              <input type="text" class="form-control" name="pName" [(ngModel)]="pName"  placeholder="productname" name="">
              </h2>
            
          </div>
          <div class="col-md-8"></div>
          
        </div>
        <br>
      
        <div class="row">
          <div class="col-md-12">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#home" role="tab">General Information</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#profile" role="tab">Invertory</a>
              </li>
            
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="home" role="tabpanel">
              <div class="row" style="margin-top: 2%;">
                <div class="col-md-4">
                  <h3 style="text-align: right;">Category</h3> 
                </div>
                <div class="col-md-1" style="border-right: 1px solid green;"></div>
                <div class="col-md-5">
                  <select name="category" [(ngModel)]="newCategory" class="form-control" id="">
                    
                      <option  *ngFor="let item of categories" value="{{item.name}}">{{item.name}}</option>
                    
                    
                  </select>
                </div>
              </div>
              <div class="row" >
                <div class="col-md-4" style="margin-top: 2%;">
                  <h3 style="text-align: right;">Image</h3> 
                </div>
                <div class="col-md-1" style="border-right: 1px solid green;"></div>
                <div class="col-md-5" style="margin-top: 2%;">
                  <input type="file" (change)="getRFiles($event)" accept="image/*" class="form-control">
                  <span class="pull-right  glyphicon glyphicon-camera"></span>
                </div>
              </div>
                <div class="row" >
                <div class="col-md-4" style="margin-top: 1%;">
                  <h3 style="text-align: right;">Price</h3> 
                </div>
                <div class="col-md-1" style="border-right: 1px solid green;"></div>
                <div class="col-md-5" style="margin-top: 1%;">
                  <input type="number" name="price" [(ngModel)]="price" placeholder="0.00 /=" class="form-control">
                  
                </div>
              </div>
             </div>
              <div class="tab-pane" id="profile" role="tabpanel">
               <div class="row" style="margin-top: 2%;">
                 <div class="col-md-4">
                   <h3 style="text-align: right;">Choose Inventory</h3> 
                 </div>
                 <div class="col-md-1" style="border-right: 1px solid green;"></div>
                 <div class="col-md-5">
                   <select name="" size="8" name="incredient" [(ngModel)]="newIncredient" multiple class="form-control" id="">
                     
                       <option  style="font-size: 14px;" *ngFor="let item of incredients" value="{{item.name}}">
                       {{item.name}}</option>
                     
                     
                   </select>
                 </div>
               </div>
              </div>
              
            </div>
           
          </div>
        </div>
        
      </div>
      
    </div>
     
  `,
  styles: [`
  .form{
      min-width: 650px;
    max-width: 860px;
    min-height: 330px;
    padding: 16px;
    border: 1px solid #c8c8d3;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    background: white;
},



  `],
  providers:[StoreService]
})
export class CreateComponent implements OnInit {

  constructor(public msg:MessagesService,private _location: Location,private service:StoreService,private pService: NgProgressService) { }
private pName:any;
private categories;
private incredients;
private newCategory;
private newIncredient;
private price;
  ngOnInit() {
    
    this.service.listProducts().subscribe(
      resp=>{console.log(resp)})
    this.service.ListCategory().subscribe(
      resp=>{
        this.categories=resp;

      })
    this.service.ListIncredientsInstore().subscribe(
      resp=>{
        this.incredients=resp

      }
      )
  }
   discard(){
    this._location.back();

  }
   newfiles : FileList; 
       getRFiles(event){ 
           this.newfiles = event.target.files; 
       }
private a:string="";
save(){
  var file:any;
if (this.pName == undefined || this.price == undefined || this.newIncredient == undefined) {
  this.msg.info('please make sure you fill product (name),(price) and (Incredients)')
}else{
// if category left
if (this.newCategory == undefined) {
  this.newCategory=""
}
// if category left
  
  // if file has left
  if (this.newfiles == undefined) {
    file=""
  }else file=this.newfiles[0]
  // if file has left

  // if category has left
 
  

// if all field have been provided
  this.service.createProduct(this.price,this.pName,file,this.newCategory,this.newIncredient[0] ).subscribe(
    resp=>{

      this.service.updateProductIncredient(this.newIncredient,this.pName).subscribe(
        resp=>{
            alert('succesfull')
            this._location.back();
            
        },
        error=>{
      
      })
    },Error=>{
      if (Error.status=400) {
        this.msg.error("this products exist already")
      }
      
    }
    
    )
  // if all field have been provided
}

}
}
