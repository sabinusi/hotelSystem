import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Router} from '@angular/router';
import {NgProgressService} from "ng2-progressbar";
import {MessagesService} from 'ng2-messages/ng2-messages';
@Component({
  selector: 'app-view-other-products',
  template: `
    <div class="row">
      <div class="col-md-12">
       <p style="margin-top: 2px;color: blue;font-size: 20px;">ViewOtherProducts</p>
       <!-- open row -->
       <div class="row">
         <!-- button area -->
         <div class="col-md-4" style="margin-top: 1%;">
             <a class="btn btn-primary" (click)="create()" style="color: white;"  >create</a> 
         </div>
         <div class="col-md-4">
           <ng2-messages></ng2-messages>
         </div>
         <!-- button area -->
       
         <!-- serch area -->
         <div class="col-md-4" >
           <input type="text" placeholder="serch product" [(ngModel)]="productFilter.name"   class="form-control">
         </div>
         <!-- serch area -->
       </div>
       <!-- close row -->
       
         <hr style="border: 0.5px solid #000000">
      </div>
    </div>
    <div class="row mainForm" style="background-image: url('./assets/bac.png');">
     <div class="col-md-12 "  *ngFor="let item of product | filterBy: productFilter,let i=index">
       
         <div class="row smallForm" >
           
           <div class="col-md-4">
               <div class="product">
                       <div class="pr" (click)="edit(i)"> 
                         <img src="{{item.pic}}"  alt="image" *ngIf="item.pic">
                         <img src="/assets/def.jpg"  >
                         <h2 [attr.id]="i">{{item.name}}</h2>
                       </div>
               </div>
              
           </div>
           <!-- invetory settings -->
           <div class="col-md-5" style="height: 100%;overflow-y: auto;">
                             <div class="row" [attr.class]="i">
               <div  class="col-md-12" *ngFor="let item of item.incedient,let p=index">
                     <span [attr.id]="[i,p]">{{item}}</span>  <input class="form-control" [(ngModel)]="incredient[[i,p]]" type="number">
               </div>
             </div>
            </div>
            <div class="col-md-1">
             <h1 class="badge badge-primary">{{item.avilableForSell}}</h1>
             <span *ngIf="done[i]=='true'" [attr.id]="done[i]"><img src="./assets/t.jpg" alt="success" width="50" height="50">done!</span>
            
            </div>

            <div class="col-md-2">
              <button class="btn btn-success" (click)="save(i)" style="width: 80px;margin-top:  90%;">save</button>
            </div>
             <!-- invetory settings -->
         </div>
       </div>
    </div>  
  `,
  styles: [`
    .smallForm{
        
      min-width: 650px;
      max-width: 860px;
      margin:3px;
      height: 150px;
      padding: 5px;
      border: 1px solid #c8c8d3;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      background: white;

      
    }
    .mainForm{
      min-width: 650px;
      max-width: 860px;
      min-height: 375px;
      max-height: 100px;
      
          
      position: relative;
      overflow: auto;
      



      
      
  }
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
      height: 80px;
      background: #A8AAAB;
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
    height: 80px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    border-bottom-width: 3px;
    overflow: hidden;
    cursor: pointer;
  }
  .product:hover{
    -webkit-transform: scale(1.1);
     -moz-transform: scale(1.1);
     -o-transform: scale(1.1);
     transform: scale(1.1);
     transition: all 0.1s;
     -webkit-transition: all 0.1s;
  }

  `],
  providers:[StoreService]
})
export class ViewOtherProductsComponent implements OnInit {

  constructor(public msg:MessagesService,private service:StoreService,private router:Router,private pService: NgProgressService) { }

 private product:any;
private available:any;
private numb:number;
private img:any;
productFilter: any = { name: '' };
private bind:Array<any>=[]
private done=[]
  private incredient=[];
  ngOnInit() {
    

    this.service.getOtherProducts().subscribe(
      resp=>{
        this.product=resp
        for (var i = 0; i <this.product.length; ++i) {
           this.done.push("done"+i )

         } 
      })

  }    create(){
    this.router.navigateByUrl('/settings/(op:otherProducts/(oc:create))')
  }
edit(i){
  var name=document.getElementById(i).innerHTML
  this.router.navigateByUrl('/settings/(op:otherProducts/(oe:edit/'+name+'))')
}
private num:number=0;
save(p){
  
  var pname=document.getElementById(p).innerHTML
 //  console.log(this.incredient)
  this.service.getOtherProductsIncredients(pname).subscribe(
    resp1=>{
      console.log(resp1[0].incedient)
      
      if (resp1[0].incedient.length !== 0) {
        for (var i = 0; i < resp1[0].incedient.length; ++i) {
       var name=document.getElementById(p+','+i).innerHTML
               var value=this.incredient[p+','+i]
               if (value == undefined) {
                 this.msg.error('please fill all incredient in  '+pname)
                 return
               }
              
               this.service.UpdateAvailableNumberOfIncredientInStore(name,value).subscribe(
                 resp=>{
                       
                 }
                 )


               this.service.getMeasurableUnitOfIncredient(name).subscribe(
                 resp2=>{
                  this.pService.start();
                  console.log(resp2)
                    this.service.CreateStoreReport(resp2.name,"REDUCED",value+resp2.measure_units,"used to create "+pname).subscribe(
                 resp=>{
                   if (i == resp1[0].incedient.length) {
                     this.done[p]="true"
                     this.pService.done()
                     
                   }
                   console.log(resp)

                 }
                 )
                 })
              

       }
       }
    },Error=>{
      console.log(Error.status)
    }
  )

  
}
namePrice(data){
console.log(document.getElementById(data))
console.log(document.getElementsByName(data))
}
}