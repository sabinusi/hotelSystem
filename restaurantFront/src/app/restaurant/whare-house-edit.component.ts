import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {StoreService} from './store.service';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import {NgProgressService} from "ng2-progressbar";
@Component({
  selector: 'app-whare-house-edit',
  template: `
   <h3><b style="color: blue;font-size: 20px;">UpdateIncredient &emsp;</b>/ {{name}}</h3>
   <br>
   <div class="row">
     <div class="col-md-4"><button class="btn btn-primary" id="save" (click)="save()">save</button> <button class="btn btn-default" (click)="discard()">Return</button> </div>
     <div class="col-md-6"></div>
     <div class="col-md-2"><button class="pull-right btn btn-danger" (click)="delete()" >delete</button></div>
   </div>
   <hr>
  <ul class="list-group">
    <li class="list-group-item " style="text-align: center;"><b>Update newUnits</b> </li>
    <li class="list-group-item ">
      <form action="">
      
         <li class="list-group-item">
          <div class="row">
             <div class="col-md-4 col-md-push-2">Normal units</div>
                       <div class="col-md-2">
                       <input type="number"  placeholder="{{whareHouseData.normalrange}}" name="normal" [(ngModel)]="normal" class="form-control">
                       </div>
              </div>
        </li>
        
         <li class="list-group-item">
          <div class="row">
             <div class="col-md-4 col-md-push-2">Availabe Units</div>
                       <div class="col-md-2">
                       <input type="number" name="available" placeholder="{{whareHouseData.available}}" [(ngModel)]="available" class="form-control">
                       </div>
          </div>
         
        </li>
        


      </form>
      
    </li>
    
  </ul>
  `,
  styles: [],
  providers:[StoreService]
})
export class WhareHouseEditComponent implements OnInit {
private name:string
private normal:number;
private available:number;
private whareHouseData:Array<any>;
  constructor(private pService: NgProgressService,private activatedRoute:ActivatedRoute,private service:StoreService,private _location: Location) { }
  
  ngOnInit() {
  
    this.activatedRoute.params.subscribe((params: Params) => {
           let userId = params['name'];
           this.name=userId
        this.service.ListSpecificIncredientsWharehouse(this.name).subscribe(
           resp=>{this.whareHouseData=resp
           console.log(this.whareHouseData)
         }
          )
          
         
  })
  }

    discard(){
    this._location.back();

  }

  
  save(){


    if (this.normal==undefined && this.available==undefined) {
      alert('no change applied')
      return
    } if (this.normal==undefined && !(this.available==undefined)) {
      this.pService.start();
      this.service.updateSpecificIncredientWhareHouse(this.name,this.whareHouseData["normalrange"],this.available).subscribe(
        resp=>{
          
          this.service.CreateWhareHouseReport(this.name,'ADDED',"INCREASE DIRECT",this.whareHouseData['normalrange'],this.whareHouseData['normalrange'],this.whareHouseData['available'],this.available).subscribe(
            resp =>{
              this.pService.done();
           alert('succesfull')
              this._location.back();
          }
          )
      }
      )
      return
    }if (!(this.normal==undefined) && this.available==undefined) {
      this.pService.start();
      
      this.service.updateSpecificIncredientWhareHouse(this.name,this.normal,this.whareHouseData["available"]).subscribe(
        resp=>{
          this.service.CreateWhareHouseReport(this.name,'CHANGES',"MAKE CHANGE TO NORMAL UNITS",this.whareHouseData['normalrange'],this.normal,this.whareHouseData['available'],this.whareHouseData['available']).subscribe(
            resp =>{
           this.pService.done();
              alert("succesfull")
              this._location.back();
          }),Error=>{console.log(Error.status)}
      })
     return
    }else{
      this.pService.start();
    
      this.service.updateSpecificIncredientWhareHouse(this.name,this.normal,this.available).subscribe(
        resp=>{
          this.service.CreateWhareHouseReport(this.name,'ADDED',"MAKE CHANGES TO BOTH NORMAL AND AVAILABLE UNITS",this.whareHouseData['normalrange'],this.normal,this.whareHouseData['available'],this.available).subscribe(
            resp =>{
           
              alert("succesfull")
              this.pService.done();
              this._location.back();
          }),Error=>{console.log(Error.status)}
      })
    }


    



}
delete(){
  this.pService.start();
  this.service.deleteIncredientInWharehouse(this.name).subscribe(
    resp=>{

      alert('removed succesfull')
      this._location.back();
      this.pService.done();

    }
    )
}
}
