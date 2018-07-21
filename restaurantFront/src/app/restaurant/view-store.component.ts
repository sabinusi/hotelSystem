import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { StoreService } from './store.service';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-view-store',
  template: `
  <div class="container-fluid">
    <p><b style="color: blue;font-size: 20px">StoreIngredients</b> </p>
    <div class="row">
      <div class="col-md-8">
        <button class="btn btn-primary" (click)="createIncredient()">create</button>
      </div>
      <div class="col-md-4">
         <input *ngIf="config.filtering" placeholder="Search incredients"
                [ngTableFiltering]="config.filtering"
                class="form-control"
                (tableChanged)="onChangeTable(config)"/>
       </div>
    </div>
    <hr>
      <div class="row" >
         <div class="col-md-12">
          
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

          <pre style="" *ngIf="config.paging" class="badge badge-success" >Page: {{page}} / {{numPages}}</pre> <pre class="badge badge-default">click a row to edit</pre>
    </div>
  </div>
  `,
  styles: [],
  providers:[StoreService] 
})
export class ViewStoreComponent implements OnInit,OnDestroy {

   private ngUnsubscribe: Subject<boolean> = new Subject();
    public rows:Array<any> = [];
    public columns:Array<any> = [
      {title: 'Name', name: 'name'},
      {
        title: 'NormalUnits',
        name: 'normal_units'
        
        
      },
      {title: 'MeasuredUnits',  name: 'measure_units', sort: 'asc'},
      {title: 'AvailableUnits.', name: 'availableUnits'}
      
      
    ];
    public page:number = 1;
    public itemsPerPage:number = 7;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;

    public config:any = {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered','table-hover']
    };

    private data:Array<any> =[]


   
   private showStore:boolean=true;
  private showSave:boolean=false;

    constructor(private service:StoreService,private router:Router) {
      this.length = this.data.length;
     }


    public ngOnInit():void {
      
      this.service.ListIncredientsInstore().subscribe(
        (res)=>res.forEach(item=>{

        this.data.push(item);
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
  
  this.router.navigateByUrl('/settings/(s:Store/(eI:editIncredient/'+data.row['name']+'))')
      
    }
    createIncredient(){
      this.router.navigateByUrl('/settings/(s:Store/(cI:createIncreadient))')
  }
  ngOnDestroy() {
         this.ngUnsubscribe.next(true);
         this.ngUnsubscribe.complete();
     }
}
