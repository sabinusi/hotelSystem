import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {StoreService} from './store.service';
import {MessagesService} from 'ng2-messages/ng2-messages';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import {NgProgressService} from "ng2-progressbar";
@Component({
  selector: 'app-edit',
  template: `
    <h3><b style="color: blue;font-size: 20px;">EditProduct &emsp;</b>/{{name}}</h3>
      <br>
      <div class="row">
        <div class="col-md-4"><button class="btn btn-primary" (click)="save()">save</button> <button class="btn btn-default" (click)="discard()">Return</button> 
          
        </div>
        <div class="col-md-6"><ng2-messages></ng2-messages></div>
        <div class="col-md-2"><button class="btn btn-danger" (click)="delete()">delete</button></div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-12 form">
          <div class="row" >
            <div class="col-md-4 ">
              
                  <div class="product" >
                  <div class="pr"> 
                    <img src="{{product.pic}}"  alt="image" *ngIf="product.pic">
                    <img src="./assets/def.jpg" alt="success" width="50" height="50">
                  </div>
                 </div>
                
              
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <h2>
                <label for="">Product Name</label>
              <input type="text" class="form-control" name="pName" disabled [(ngModel)]="pName"  placeholder="{{product.name}}" name="">
              </h2>
            </div>
            
          </div>
          
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
                      
                        <option  *ngFor="let item of categories"   value="{{item.name}}">{{item.name}}</option>
                      
                      
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
                    <input type="number" name="price" [(ngModel)]="price" placeholder="{{product.price}}/=" class="form-control">
                    
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
                     <select name="" size="8"  name="incredient" [(ngModel)]="newIncredient" multiple class="form-control" id="">
                       
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
  
    .pr img{
      max-height: 100px;
      max-width: 120px;
      vertical-align: middle;
    }
    .pr{
      position: relative;
      width: 120px;
      height: 100px;
      background: white;
      text-align: center;
    }
    .product{
    position: relative;
    vertical-align: top;
    display: inline-block;
    line-height: 100px;
    font-size: 11px;
    margin: 8px !important;
    width: 122px;
    height: 115px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    border-bottom-width: 3px;
    overflow: hidden;
    cursor: pointer;
  }
  .product:hover{
    -webkit-transform: scale(0.9);
     -moz-transform: scale(0.9);
     -o-transform: scale(0.9);
     transform: scale(0.9);
     transition: all 0.1s;
     -webkit-transition: all 0.1s;
  }
  `],
  providers:[StoreService]
})
export class EditComponent implements OnInit {

  constructor(public msg:MessagesService,private activatedRoute:ActivatedRoute,private service:StoreService,private _location: Location,private pService: NgProgressService,private router:Router) { }
private name:string;
private incredients:any;
private product:any;
private newIncredient:any;
private price:any;
private newCategory:any;
private categories:any;

  ngOnInit() {
 

  
    this.activatedRoute.params.subscribe((params: Params) => {
           let userId = params['name'];
           this.name=userId
           
         })
         this.service.ListCategory().subscribe(
           resp=>{
             this.categories=resp;

           })
         this.service.ListIncredientsInstore().subscribe(
           resp=>{
             this.incredients=resp

           }
           )
         this.service.RetriveProduct(this.name).subscribe(
            resp=>{
              this.product=resp
              console.log(resp)

              
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
delete(){

  
  this.service.deleteProduct(this.name).subscribe(
    resp=>{
alert('succesfull')

this.router.navigateByUrl('/settings/(p:products/(v:view)')
    })
}

save(){

if (this.price == undefined && this.newIncredient ==undefined && this.newfiles == undefined && this.newCategory==undefined) {
  this.msg.error('no changes detected')
  return
}
if (this.price == undefined) {
  this.price=this.product.price
}

if (this.newIncredient == undefined) {
  this.newIncredient ==this.product.increadients
}
if (this.newCategory == undefined) {
  this.newCategory=this.product.category
}
// if every things goes in order
this.service.updateProduct(this.name,this.price,this.newCategory,this.incredients[0].name ).subscribe(
  resp=>{
this.pService.start()
    this.service.updateProductIncredient(this.newIncredient,this.name).subscribe(
      resp=>{
        if (this.newfiles != undefined) {
          this.service.updateProductPic(this.name,this.newfiles[0]).subscribe(
              resp=>{
                alert('succesfull')
                this.pService.done()
                this._location.back();
              }
            )
        }else{
          alert('succesfull')
          this.pService.done()
          this._location.back();

        }
       
          
          
      },
      error=>{
    
    })
  },Error=>{
    this.msg.error("failed")

    
  }
  
  )
// if every things goes in order

}
}
