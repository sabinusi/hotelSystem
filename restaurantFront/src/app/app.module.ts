import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { AppComponent } from './app.component';
import { MessagesService, MessagesComponent } from 'ng2-messages/ng2-messages';
import {PopupModule} from 'ng2-opd-popup';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { NgProgressModule } from 'ng2-progressbar';
import { routing } from './route.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { SettingsComponent } from './restaurant/settings.component';
import { SalesessionComponent } from './restaurant/salesession.component';
import { HomeComponent } from './restaurant/home.component';
import { ProductsComponent } from './restaurant/products.component';
import { StoreComponent } from './restaurant/store.component';
import { WharehouseComponent } from './restaurant/wharehouse.component';
import { CreateComponent } from './restaurant/create.component';
import { EditComponent } from './restaurant/edit.component';
import { CreateStoreIcreadientComponent } from './restaurant/create-store-icreadient.component';
import { EditStoreIncredientComponent } from './restaurant/edit-store-incredient.component';
import { WhareHouseGreateComponent } from './restaurant/whare-house-greate.component';
import { WhareHouseEditComponent } from './restaurant/whare-house-edit.component';
import { CategoryComponent } from './restaurant/category.component';
import { CreateCategoryComponent } from './restaurant/create-category.component';
import { EditCategoryComponent } from './restaurant/edit-category.component';
import { ViewStoreComponent } from './restaurant/view-store.component';
import { ViewCategoryComponent } from './restaurant/view-category.component';
import { ViewProductsComponent } from './restaurant/view-products.component';
import { SalesReportComponent } from './restaurant/report/sales-report.component';
import { WharehouseReportComponent } from './restaurant/report/wharehouse-report.component';
import { StoreReportComponent } from './restaurant/report/store-report.component';
import { OwnerComponent } from './restaurant/owner.component';
import {AuthService} from './restaurant/auth.service';
import { ViewOtherProductsComponent } from './restaurant/view-other-products.component';
import { EditOtherProductsComponent } from './restaurant/edit-other-products.component';
import { GreateOtherProductsComponent } from './restaurant/greate-other-products.component';
import { OtherProductsComponent } from './restaurant/other-products.component';




@NgModule({
  declarations: [
    AppComponent,
    
    SettingsComponent,
    SalesessionComponent,
    HomeComponent,
    ProductsComponent,
    StoreComponent,
    WharehouseComponent,
    CreateComponent,
    EditComponent,
    CreateStoreIcreadientComponent,
    EditStoreIncredientComponent,
    WhareHouseGreateComponent,
    WhareHouseEditComponent,
    CategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ViewStoreComponent,
    ViewCategoryComponent,
    ViewProductsComponent,
    SalesReportComponent,
    WharehouseReportComponent,
    StoreReportComponent,
     MessagesComponent,
    OwnerComponent,
    ViewOtherProductsComponent,
    EditOtherProductsComponent,
    GreateOtherProductsComponent,
    OtherProductsComponent
    
    
  ],
  imports: [
    BrowserModule,
    routing,
     Ng2TableModule,
     PaginationModule.forRoot(),
      PopupModule.forRoot(),
      Ng2FilterPipeModule,
     HttpModule,

     NgProgressModule,
     AngularDateTimePickerModule,
    FormsModule
  ],
  providers: [MessagesService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
