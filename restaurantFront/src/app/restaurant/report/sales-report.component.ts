import { Component, OnInit } from '@angular/core';
import {StoreService} from '../store.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sales-report',
  template: `
  <div class="row">
      <div class="col-md-4"><b style="color: blue;font-size: 20px">Sales Report</b></div>
      <!-- from area -->
      <div class="col-md-3">
        
         
           <div class="form-group">
               <div class='input-group date' id='datetimepicker1'>
                 <span> <i>from</i> &emsp;</span>
                   <angular2-date-picker [(ngModel)]="startdate" [settings]="settings"></angular2-date-picker>
                   <span class="input-group-addon">
                       <span class="glyphicon glyphicon-calendar"></span>
                   </span>
               </div>
           </div>
           </div>
           <!-- from area -->
           <!-- to area -->
       <div class="col-md-3">
             
                <div class="form-group">
                    <div class='input-group '>
                      <span> <i>to</i> &emsp;</span>
                        <angular2-date-picker [(ngModel)]="enddate" [settings]="settings"></angular2-date-picker>
                        <span class="input-group-addon">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                
          
            
        
      </div>
      <!-- to area -->
      <div class="col-md-2">
        <button class="btn btn-success form-control" (click)="view()">view</button>
      </div>
    </div>

    <hr>
    <div class="row">
      <div class="col-md-5">
        <input type="text" class="form-control" placeholder="Search product" [(ngModel)]="productFilter.product">
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-3">
        <h2 style="background-color: #D2D2FF;border-radius: 5px;"> &emsp;total: Sh {{total}}</h2>
      </div>
    </div>
    <br>
   <div class="row" style="background-image: url('./assets/bac.png');min-height: 360px;
    max-height: 370px;
    
        
    position: relative;
    overflow: auto;
    ">
     <div class="col-md-12" >
       <table class="table table-sm table-bordered table-striped table-hover" style="background-color: white;">
         <thead>
           <tr>
             <th>No</th>
             <th>Date</th>
             <th>Time</th>
             <th>Product</th>
             <th>Price</th>
           </tr>
         </thead>
         <tbody>
           <tr *ngFor="let item of report,let i=index" >
             <th scope="row">{{i+1}}</th>
             <td>{{item.date | date :'fullDate'}}</td>
             <td>{{item.date | date :'shortTime'}}</td>
             <td >
               <div *ngFor="let ite of item.saleid |filterBy: productFilter,let p=index"  >
                 <h4 id="bo"> {{p+1}}&emsp;{{ite.product}}</h4>
               

                </div>
             </td>
             <td>
               <div *ngFor="let ite of item.saleid,let p=index" >
                 <h4 id="bo">{{ite.price}}</h4>
            
                </div>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
  `,
  styles: [
  `
  #bo{
    border-bottom:1px solid white;
  }
  `
  ],
  providers:[StoreService]
})
export class SalesReportComponent implements OnInit {
  constructor(private service:StoreService){}
  private productFilter: any = { product: '' };
  startdate: Date;
  enddate: Date;
   settings = {
       bigBanner: false,
       timePicker: false,
       format: 'dd-MM-yyyy',
       defaultOpen: false
   }
  private report:any;
  private total:number=0;
ngOnInit(){
  this.service.saleReport().subscribe(
    resp=>{ 
      this.report=resp;
      console.log(this.report[0].saleid[0].price);

      for (var i = 0; i < this.report.length; ++i) {
        for (var p = 0; p < this.report[i].saleid.length; ++p) {
          this.total+=this.report[i].saleid[p].price
        }
      }
      
    }
    )
}
  
 view(){
   this.report=[]
   var s=new Date(this.startdate)
   var ko=s.getMonth() + 1
   var e=new Date(this.enddate)
   var sa=e.getMonth() +1
    var start=s.getFullYear()+"-"+ko+"-"+s.getDate();
   var end=e.getFullYear()+"-"+sa+"-"+e.getDate();
  this.service.viewSalesReportBasedOnDate(start,end).subscribe(
    resp=>{
      this.report=resp;
      this.total=0;
        for (var i = 0; i < this.report.length; ++i) {
        for (var p = 0; p < this.report[i].saleid.length; ++p) {
          this.total+=this.report[i].saleid[p].price
        }
      }
      
    })
 }

}
