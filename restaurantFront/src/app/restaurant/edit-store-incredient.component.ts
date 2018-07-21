import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {StoreService} from './store.service';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';
import {NgProgressService} from "ng2-progressbar";
import {Popup} from 'ng2-opd-popup';
import {MessagesService} from 'ng2-messages/ng2-messages';
@Component({
  selector: 'app-edit-store-incredient',
  template: `
  <h3><b style="color: blue;font-size: 20px;">UpdateIncredient &emsp;</b>/ {{name}}</h3>
  <br>
  <div class="row">
    <div class="col-md-4"><button class="btn btn-primary" (click)="save()">save</button> <button class="btn btn-default" (click)="discard()">discard</button> </div>
    <div class="col-md-6"><ng2-messages></ng2-messages></div>
    <div class="col-md-2"><button class="pull-right btn btn-danger" (click)="delete()" >delete</button></div>
  </div>
  <hr>
   <ul class="list-group">
        <li class="list-group-item " style="text-align: center;">{{Incredients.name}}</li>
        <li class="list-group-item ">
          <form action=""  role="form" >
           
            <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">name</div>
                           <div class="col-md-6">

                           <input type="text" disabled required class="form-control" placeholder="{{Incredients.name}}" [(ngModel)]="Newname" name="name" ngModel style="background-color: #D2D2FF">
                           </div>
                  </div>
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">Normal units</div>
                           <div class="col-md-2">
                           <input type="number" [(ngModel)]="normal_units" placeholder="{{Incredients.normal_units}}" required  name="normalUnits"  class="form-control">
                           </div>
                  </div>
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">Measurable Units</div>
                           <div class="col-md-2">
                           <select name="MeasurableUnits" [(ngModel)]="measure_units"  required ngModel >
                             <option value="Kg">Kg</option>
                             <option value="litre">litre</option>
                             <option value="No">Number</option>
                           </select><span>{{Incredients.measure_units}}</span>
                           </div>
                  </div>
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">Availabe Units</div>
                           <div class="col-md-2">
                           <input type="number" placeholder="{{Incredients.availableUnits}}" required name="Availabe" [(ngModel)]="availableUnits" class="form-control">
                           </div>
              </div>
             
            </li>
             <li class="list-group-item">
              <div class="row">
                 <div class="col-md-4 col-md-push-2">PresentOnWhareHouse ?&emsp;<span class="badge badge-info">{{showinwharehouse}}</span></div>
                           <div class="col-md-2">
                           <button class="btn btn-outline-secondary" *ngIf="option == 'remove' " (click)="remove()">remove</button>
                           <button class="btn btn-outline-secondary" (click)="add()" *ngIf="option == 'add' ">add</button>
                           <span *ngIf="im"><img src="./assets/t.jpg" alt="success" width="50" height="50">done!</span>
                           </div>
                  </div>
                   
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
  styles: [],
  providers:[StoreService]
})
export class EditStoreIncredientComponent implements OnInit {

  constructor(public msg:MessagesService,private pService: NgProgressService,private activatedRoute:ActivatedRoute,private service:StoreService,private _location: Location,private popup:Popup) { }
  private Incredients:Array<any>;
private name:string
private Newname;
private availableUnits;
private normal_units;
private measure_units;
private putinwharehouse;
private showinwharehouse;
private option;
private im:boolean=false;
private wharehouse_normalUnits;
private wharehouse_available_units;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
           let userId = params['name'];
           this.name=userId;
             this.service.ListSpecificIncredientsInstore(userId).subscribe(
            resp=>{
                 this.Incredients=resp
            }
            
         )
         
  })
    // chek if incredient exist in wharehouse 
    this.service.ListSpecificIncredientsWharehouse(this.name).subscribe(
      resp=>{
           this.showinwharehouse='Present '
           this.option='remove'

      },
      Error=>{
        this.showinwharehouse='Not Present'
        this.option='add'
      }
      )
    // chek if incredient exist in wharehouse 
  }
  discard(){
  this._location.back();

}

save(){
  if (this.availableUnits==undefined && (this.normal_units==undefined) && (this.Newname==undefined) && (this.measure_units==undefined)) {
    alert('no changes apllied');
    return
  }
  if (this.measure_units!=undefined) {
    this.pService.start();
    if (this.availableUnits==undefined && (this.normal_units==undefined) && (this.Newname==undefined)) {
        this.service.updateMeasurableUnitInStore(this.Incredients['name'],this.measure_units).subscribe(
          resp=>{
            alert('succesfull')
            this.pService.done();
        })
      return
    }
  }
  
  if (this.Newname==undefined) {

    this.Newname=this.Incredients['name']
    
  }
  if (this.availableUnits==undefined) {

    this.availableUnits=this.Incredients['availableUnits']
    
  }
   if (this.normal_units==undefined) {

    this.normal_units=this.Incredients['normal_units']
    
  }
   if (this.measure_units==undefined) {

    this.measure_units=this.Incredients['measure_units']
    
  }
  if (this.availableUnits < this.Incredients['availableUnits']) {
    alert('not allowed to reduce incredient here')
    return
  }

  
  this.service.updateSpecificIncredientInstore(this.name,this.normal_units,this.measure_units,this.availableUnits,this.Newname).subscribe(
    resp=>{
      this.pService.start();
      // start to update deleted amount in wharehouse
      if (this.availableUnits !=undefined) {
        // get difference in amount in between available unit and increased one
        if (parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits'])>0) {
          // get specific increadient in wharehouse and
          this.service.ListSpecificIncredientsWharehouse(this.name).subscribe(
            respa=>{
              // create wharehouse report
              this.service.CreateWhareHouseReport(this.name,"REDUCED","NCREADIENT ADDED TO STORE","","",respa.available+this.measure_units,parseInt( respa.available)-(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']))+this.measure_units).subscribe(
                resp=>{
                  // update wharehouse
                  console.log(parseInt(respa.available)-(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits'])))
                  this.service.updateSpecificIncredientWhareHouse(this.name,respa.normalrange,parseInt(respa.available)-(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']))).subscribe(
                    resp=>{
                      // create store report
                      if (this.normal_units==this.Incredients['normal_units']) {
                        this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']))+this.measure_units,"Reduced from  wharehouse").subscribe(
                          resp=>{
                             alert("succesfull update "+this.name);
                             this.pService.done();
                  this._location.back();
                          })
                      }else{
                              this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']))+this.measure_units,"Reduced from  wharehouse").subscribe(
                                resp=>{
                                  if (this.normal_units>this.Incredients['normal_units']) {
                                    this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.normal_units)-parseInt( this.Incredients['normal_units']))+this.measure_units,"Increase normalunit").subscribe(
                                      resp=>{
                                        alert("succesfull update "+this.name);
                                        this.pService.done();
                                        this._location.back();
                                      })
                                  }else{
                                    this.service.CreateStoreReport(this.name,"REDUCED",(parseInt( this.normal_units)-parseInt( this.Incredients['normal_units']))+this.measure_units,"Reduce normalunit").subscribe(
                                      resp=>{
                                        alert("succesfull update "+this.name);
                                        this.pService.done();
                                        this._location.back();
                                      })
                                   
                                  }
                        
                                })
                      }
                      
                      // create store report
                 
                    })
                  // update wharehouse
                  
                })
              // create wharehouse report
            },
            // failed on get from wharehouse and found Error so we create store report
            Error=>{
                if(Error.status==404){
                      if (this.normal_units==this.Incredients['normal_units']) {
                        this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']))+this.measure_units,"Reduced from  wharehouse").subscribe(
                          resp=>{
                             alert("succesfull update "+this.name);
                             this.pService.done();
                  this._location.back();
                          })
                      }else{
                              this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']))+this.measure_units,"Reduced from  wharehouse").subscribe(
                                resp=>{
                                  if (this.normal_units>this.Incredients['normal_units']) {
                                    this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.normal_units)-parseInt( this.Incredients['normal_units']))+this.measure_units,"Increase normalunit").subscribe(
                                      resp=>{
                                        alert("succesfull update "+this.name);
                                        this.pService.done();
                                        this._location.back();
                                      })
                                  }else{
                                    this.service.CreateStoreReport(this.name,"REDUCED",(parseInt( this.normal_units)-parseInt( this.Incredients['normal_units']))+this.measure_units,"Reduce normalunit").subscribe(
                                      resp=>{
                                        alert("succesfull update "+this.name);
                                        this.pService.done();
                                        this._location.back();
                                      })
                                   
                                  }
                        
                                })
                      }
                }
            }
            // failed on get from wharehouse and found Error so we create store report
            )

         // get specific increadient in wharehouse and
        }else if(parseInt( this.availableUnits)-parseInt( this.Incredients['availableUnits']) == 0){
          if (this.normal_units>this.Incredients['normal_units']) {
            this.service.CreateStoreReport(this.name,"ADDED",(parseInt( this.normal_units)-parseInt( this.Incredients['normal_units']))+this.measure_units,"Increase normalunit").subscribe(
              resp=>{
                alert("succesfull update "+this.name);
                this.pService.done()
                this._location.back();
              })
          }else{
            this.service.CreateStoreReport(this.name,"REDUCED",(parseInt( this.normal_units)-parseInt( this.Incredients['normal_units']))+this.measure_units,"Reduce normalunit").subscribe(
              resp=>{
                alert("succesfull update "+this.name);
                this.pService.done()
                this._location.back();
              })
           
          }
        }
        // get difference in amount in between available unit and increased one
      }
      // start to update deleted amount in wharehouse
      
    },
    error=>{this.msg.error('failed becouse Incredient with that name already exist')}

    )

}
delete(){
  this.pService.start();
  this.service.retriveNameFromWhareHouse(this.name).subscribe(

    resp=>{
      this.service.deleteIncredientInStore(this.name).subscribe(
        resp=>{
          
              this.service.ListSpecificIncredientsWharehouse(this.name).subscribe(
                resp=>{
                  this.service.CreateWhareHouseReport(this.name,"REMOVED","REMOVED AFTER REMOVED IN STORE",resp.normalrange+this.Incredients['measure_units'],"",resp.available+this.Incredients['measure_units'],"").subscribe(
                    resp=>{
                      this.service.deleteIncredientInWharehouse(this.name).subscribe(
                        resp=>{

                      alert('succesfull delete Incredient/ '+this.name +"  and from wharehouse")
                      this.pService.done()
                      this._location.back()
                    }
                    )
                  
                }
                )
            
            })

          
        })
      
      },
      Error=>{
        
        if (Error.status==404) {
          this.service.deleteIncredientInStore(this.name).subscribe(
            resp=>{

              alert('succesfull delete Incredient/ '+this.name)
              this.pService.done()
              this._location.back()
            })
        }
      }
      )

}
remove(){
 this.service.ListSpecificIncredientsWharehouse(this.name).subscribe(
   resp=>{
     this.service.deleteIncredientInWharehouse(this.name).subscribe(
       resp1=>{
            this.service.CreateWhareHouseReport(this.name,"REMOVED","REMOVED AFTER REMOVED IN STORE",resp.normalrange+this.Incredients['measure_units'],"",resp.available+this.Incredients['measure_units'],"").subscribe(
              resp2=>{
                this.im=true;
                this.showinwharehouse='Not Present'
                this.option='';
                
              })
       }
       )
   }
   )
}
add(){
  this.popup.options.header="Enter Wharehouse Datas"
  this.popup.options.widthProsentage=40
  this.popup.options.animationDuration=0.5
  this.popup.options.animation="fadeInLeft"
   this.popup.show();
 
}
CreateWharehouse(){
  if (this.wharehouse_available_units != undefined && (this.wharehouse_normalUnits != undefined)) {
     // chek if incredient ever existed in wharehouse report
    this.service.getNameFromWharehouseReport(this.name).subscribe(
      resp=>{
        if(resp.length != 0){
        this.service.createWhareHouseIncredient(this.name,this.wharehouse_normalUnits,this.wharehouse_available_units).subscribe(
          resp=>{
            
            this.service.CreateWhareHouseReport(this.name,"CREATED","CREATED AGAIN AFTER EDIT IN STORE","",this.wharehouse_normalUnits+this.Incredients['measure_units'],"",this.wharehouse_available_units+this.Incredients['measure_units']).subscribe(
              respo=>{
               this.im=true
               this.option=''
               this.showinwharehouse='Present '
               this.popup.hide()
               
              }
              )
        

      }
      )
      
      
        }else
            this.service.createWhareHouseIncredient(this.name,this.wharehouse_normalUnits,this.wharehouse_available_units).subscribe(
              resp=>{
                this.service.CreateWhareHouseReport(this.name,"CREATED","CREATED NEW AFTER EDIT IN STORE","",this.wharehouse_normalUnits+this.Incredients['measure_units'],"",this.wharehouse_available_units+this.Incredients['measure_units']).subscribe(
                  respo=>{
                    this.im=true
               this.option=''
               this.showinwharehouse='Present '
               this.popup.hide()
                   
                  }
                  )

          })
      }
        
      
      )
    // chek if incredient ever existed in wharehouse report
    
     
      
  }else{
    this.msg.error("please fill all fields")
  }

}

}
