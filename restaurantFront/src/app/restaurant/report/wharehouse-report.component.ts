import { Component, OnInit } from '@angular/core';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-wharehouse-report',
  template: `
   <div class="row">
       <div class="col-md-4"><b style="color: blue;font-size: 20px">WhareHouse Report</b></div>
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
     <div style="min-height: 380px;
    max-height: 410px; overflow: auto;">
     <div style="background-image: url('./assets/bac.png');">
     <div class="row" style="background-color: white;">
       <div class="col-md-4">
         <input *ngIf="config.filtering" placeholder="Search incredient"
                [ngTableFiltering]="config.filtering"
                class="form-control"
                (tableChanged)="onChangeTable(config)"/>
       </div>
     </div>
     <br>
     <div style="background-color: white;">
     <ng-table [config]="config"
               (tableChanged)="onChangeTable(config)"
               (cellClicked)="onCellClick($event)"
               [rows]="rows" [columns]="columns">
     </ng-table>
     <pagination *ngIf="config.paging"
                 class="pagination-sm"
                 [(ngModel)]="page"
                 [totalItems]="length"
                 [itemsPerPage]="itemsPerPage"
                 [maxSize]="maxSize"
                 [boundaryLinks]="true"
                 [rotate]="false"
                 (pageChanged)="onChangeTable(config, $event)"
                 (numPages)="numPages = $event">
     </pagination>
     <pre *ngIf="config.paging" class="badge badge-success">Page: {{page}} / {{numPages}}</pre>
     </div>
     </div>
     </div>
  `,
  styles: [`
  


  `],
  providers:[StoreService]
})
export class WharehouseReportComponent implements OnInit {
startdate: Date;
enddate: Date;
 settings = {
     bigBanner: false,
     timePicker: false,
     format: 'dd-MM-yyyy',
     defaultOpen: false
 }
  public rows:Array<any> = [];
    public columns:Array<any> = [
      {title: 'Incredient', name: 'inredientName'},
      {
        title: 'Status',
        name: 'status',
      },
      {title: 'Normal Before', name: 'normalBefore'},
      {title: 'Normal After', name: 'normalAfter'},
      {title: 'Available Before', name: 'availableBefore'},
      {title: 'Available After', name: 'availableAfter'},
      {title: 'Reason', name: 'reasons'},
      {title: 'Date', name: 'date'},
      {title: 'Time', name: 'time'},
      
    ];
    public page:number = 1;
    public itemsPerPage:number = 8;
    public maxSize:number = 30;
    public numPages:number = 1;
    public length:number = 0;

    public config:any = {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered','table-sm','table-hover']
    };

    private data:Array<any> = [];

    public constructor(private service:StoreService) {
      this.length = this.data.length;
    }

    public ngOnInit():void {
      this.service.whareReport().subscribe(
        (resp)=>resp.forEach(item=>{
        var   d=new Date(item.date)
        var m=d.getMonth() +1;
          item.date= d.getDate()+"/"+m+"/"+d.getFullYear()
          
          item.time=d.getHours()+":"+d.getMinutes()

          this.data.push(item)
          
          
         this.length=this.data.length;
             this.onChangeTable(this.config);

        })
        )
      
    }

    public changePage(page:any, data:Array<any> = this.data):Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }

    public changeSort(data:any, config:any):any {
      if (!config.sorting) {
        return data;
      }

      let columns = this.config.sorting.columns || [];
      let columnName:string = void 0;
      let sort:string = void 0;

      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sort !== '' && columns[i].sort !== false) {
          columnName = columns[i].name;
          sort = columns[i].sort;
        }
      }

      if (!columnName) {
        return data;
      }

      // simple sorting
      return data.sort((previous:any, current:any) => {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }

    public changeFilter(data:any, config:any):any {
      let filteredData:Array<any> = data;
      this.columns.forEach((column:any) => {
        if (column.filtering) {
          filteredData = filteredData.filter((item:any) => {
            return item[column.name].match(column.filtering.filterString);
          });
        }
      });

      if (!config.filtering) {
        return filteredData;
      }

      if (config.filtering.columnName) {
        return filteredData.filter((item:any) =>
          item[config.filtering.columnName].match(this.config.filtering.filterString));
      }

      let tempArray:Array<any> = [];
      filteredData.forEach((item:any) => {
        let flag = false;
        this.columns.forEach((column:any) => {
          if (item[column.name].toString().match(this.config.filtering.filterString)) {
            flag = true;
          }
        });
        if (flag) {
          tempArray.push(item);
        }
      });
      filteredData = tempArray;

      return filteredData;
    }

    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
      if (config.filtering) {
        Object.assign(this.config.filtering, config.filtering);
      }

      if (config.sorting) {
        Object.assign(this.config.sorting, config.sorting);
      }

      let filteredData = this.changeFilter(this.data, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }

    public onCellClick(data: any): any {
      
    }
view(){
  var s=new Date(this.startdate)
  var ko=s.getMonth() + 1
  var e=new Date(this.enddate)
  var sa=e.getMonth() +1
   var start=s.getFullYear()+"-"+ko+"-"+s.getDate();
  var end=e.getFullYear()+"-"+sa+"-"+e.getDate();;
  console.log(start)

  console.log(end)
  this.data=[]
    this.length=this.data.length;
             this.onChangeTable(this.config);
  this.service.viewWhareHouseReportBasedOnDate(start,end).subscribe(
        (resp)=>resp.forEach(item=>{
        var   d=new Date(item.date)
          item.date= d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
          
          item.time=d.getHours()+":"+d.getMinutes()

          this.data.push(item)
          
          
         this.length=this.data.length;
             this.onChangeTable(this.config);

        })
        )
}

}
