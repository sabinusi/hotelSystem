import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import {StoreService} from './store.service';

@Component({
  selector: 'app-view-category',
  template: `
    <div class="container-fluid" >
      <p><b style="color: blue;font-size: 20px">ViewCategory</b> </p>
      <div class="row">
        <div class="col-md-8">
          <button class="btn btn-primary" (click)="create()">create</button>
        </div>
        <div class="col-md-4">
           <input  placeholder="Search incredients"
                  class="form-control"
                 >
         </div>
      </div>
      <hr>
      <div class="row" >
        <div class="col-md-12"  >
          <div class="product" (click)="goEdit(i)"  *ngFor="let item of category,let i=index">
          <div class="pr"> 
            <img src="{{item.pic}}"  alt="image" *ngIf="item.pic">
            <img src="/assets/def.jpg"  >
            <h2 [attr.id]="i">{{item.name}}</h2>
          </div>
        </div>
        </div>

      </div>
    </div>
    
  `,
  styles: [`
  .pr h2{
  position: absolute;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  bottom: 0;
  top: auto;
  line-height: 14px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  background: -webkit-linear-gradient(-90deg,rgba(255,255,255,0),rgba(255,255,255,1), rgba(255,255,255,1));
  background: -moz-linear-gradient(-90deg,rgba(255,255,255,0),rgba(255,255,255,1), rgba(255,255,255,1));
  background: -ms-linear-gradient(-90deg,rgba(255,255,255,0),rgba(255,255,255,1), rgba(255,255,255,1));
  padding: 3px;
  padding-top: 15px;
}
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
export class ViewCategoryComponent implements OnInit {
 

  constructor(private _location: Location,private router:Router,private service:StoreService,) { }
private category:any;
  ngOnInit() {
    this.service.ListCategory().subscribe(
      resp=>{
        this.category=resp
      })
  }
  create(){

      this.router.navigateByUrl('/settings/(o:category/(c:createCategory))')
  
}
goEdit(i){
  
  var name=document.getElementById(i).innerHTML
  this.router.navigateByUrl('/settings/(o:category/(e:editCategory/'+name+'))')
}
}
