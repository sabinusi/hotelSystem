import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {StoreService} from './store.service';
import { Location } from '@angular/common';
import {Popup} from 'ng2-opd-popup';
import {NgProgressService} from "ng2-progressbar";
@Component({
  selector: 'app-create-store-icreadient',
  template: `

  
    <div class="row">

      <div class="col-md-4">
        <button class="btn btn-default" (click)="discard()">Return</button>
      </div>
    </div>
    <hr>
      <ul class="list-group">
        <li class="list-group-item " style="text-align: center;">Create new Increadient to a Store</li>
        <li class="list-group-item ">
          <form action="" #fo="ngForm" (ngSubmit)="save(fo.value)" role="form" >
           
            <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">name</div>
                           <div class="col-md-6">

                           <input type="text" required class="form-control" name="name" ngModel style="background-color: #D2D2FF">
                           </div>
                  </div>
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">Normal units</div>
                           <div class="col-md-2">
                           <input type="number" required  name="normalUnits" ngModel class="form-control">
                           </div>
                  </div>
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">Measurable Units</div>
                           <div class="col-md-2">
                           <select name="MeasurableUnits" required ngModel >
                             <option value="_Kg">Kg</option>
                             <option value="_Lt">litre</option>
                             <option value="_Count">Number</option>
                             <option value="_Mkungu">Mkungu</option>
                           </select>
                           </div>
                  </div>
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">Availabe Units</div>
                           <div class="col-md-2">
                           <input type="number" required name="Availabe" ngModel class="form-control">
                           </div>
              </div>
             
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">PresentOnWhareHouse ?  </div>
                 <div class="col-md-2">
                   <a class="badge badge-success" id="yes" (click)="yes()">yes</a>&emsp;<a class="badge badge-info" id="yes" >no</a>
                 </div>
                           
                  </div>
                   
            </li>
            <li class="list-group-item">
              <button  class="btn btn-danger "  [disabled]="!fo.valid"  >save</button> 
            </li>

          </form>
          
        </li>
        
      </ul>
       

    
    <popup (confirmClick)="CreateWharehouse()">
      <form action="">
      <ul class="list-group" >
        
            <div class="row">
                 <div class="col-md-8 ">Normal unit </div>
                 <div class="col-md-4">
                 <input type="number" [(ngModel)]="wharehouse_normalUnits" name="wharehouse_normalUnits" class="form-control">
                 </div>
                           
            </div>
            <br>
            <div class="row">
                 <div class="col-md-8 ">Available Units </div>
                 <div class="col-md-4">
                 <input type="number" class="form-control" name="wharehouse_available_units" [(ngModel)]="wharehouse_available_units">
                 </div>
                           
            </div>
          
        
      </ul>

     </form>
        
    </popup>
    
  
   
  `,
  styles: [`
  #yes:hover{
    border:1px solid blue;
    background-color:white;

  }

  `],
  providers: [StoreService]
  
})
export class CreateStoreIcreadientComponent implements OnInit {

  constructor(private pService: NgProgressService,private service:StoreService,private _location: Location,private popup:Popup) { }
private wharehouse_normalUnits:number;
private wharehouse_available_units:number;
  ngOnInit() {
  }
  save(data:any){
    this.pService.start();
    if (this.nowharehouse) {

      this.service.createStoreIncredient(data.MeasurableUnits,data.Availabe,data.name,data.normalUnits).subscribe(
        resp=>{
          this.service.CreateStoreReport(data.name,"CREATED",data.Availabe+data.MeasurableUnits,"new incredient").subscribe(
             resp=>{ 
              this.pService.done();
              alert('succesfull')

          this._location.back();}
            )
          

        },
        Error=>{
          console.log(Error)
          alert("failed")
          this.pService.done();
          }
        )

    }else{
      console.log(this.wharehouse_normalUnits)
      console.log(this.wharehouse_available_units)
      this.service.createStoreIncredient(data.MeasurableUnits,data.Availabe,data.name,data.normalUnits).subscribe(
        resp=>{
          this.service.createWhareHouseIncredient(data.name,this.wharehouse_normalUnits,this.wharehouse_available_units).subscribe(
            resp=>{
              this.service.CreateWhareHouseReport(data.name,"CREATED","CREATED AFRER CREATE IN STORE",0,this.wharehouse_normalUnits+data.MeasurableUnits,0,this.wharehouse_available_units+data.MeasurableUnits).subscribe(
                respo=>{
                  this.service.CreateStoreReport(data.name,"CREATED",data.Availabe+data.MeasurableUnits,"new incredient").subscribe(
                     resp=>{
                      
                      alert('succesfull')
                      this.pService.done();
                  this._location.back();}
                    )
                 
                }
                )
           
            },error=>{
          
          alert("failed")
          this.pService.done();
        }
            )
          

        }
        
        )

    }
    
}
discard(){
  this._location.back();

}
private nowharehouse:boolean=true;

yes(){
  this.popup.options.header="Enter Wharehouse Datas"
  this.popup.options.widthProsentage=40
  this.popup.options.animationDuration=0.5
  this.popup.options.animation="fadeInLeft"
   this.popup.show();
 }
 CreateWharehouse(){
   this.nowharehouse=false;
   this.popup.hide()
 }

}
