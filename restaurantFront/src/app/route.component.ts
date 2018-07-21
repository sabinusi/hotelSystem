import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import {SalesessionComponent} from './restaurant/salesession.component'
import {SettingsComponent} from './restaurant/settings.component'
import {HomeComponent} from './restaurant/home.component'
import {ProductsComponent} from './restaurant/products.component'
import {StoreComponent} from './restaurant/store.component'
import {WharehouseComponent} from './restaurant/wharehouse.component'
import {CreateComponent} from './restaurant/create.component'
import {EditComponent} from './restaurant/edit.component'
import {CreateStoreIcreadientComponent} from './restaurant/create-store-icreadient.component'
import {EditStoreIncredientComponent} from './restaurant/edit-store-incredient.component'
import {WhareHouseGreateComponent} from './restaurant/whare-house-greate.component'
import {WhareHouseEditComponent} from './restaurant/whare-house-edit.component'
import {CategoryComponent} from './restaurant/category.component'
import {CreateCategoryComponent} from './restaurant/create-category.component'
import {EditCategoryComponent} from './restaurant/edit-category.component'
import {ViewStoreComponent} from './restaurant/view-store.component'
import {ViewCategoryComponent} from './restaurant/view-category.component'
import {ViewProductsComponent} from './restaurant/view-products.component'
import {OwnerComponent} from './restaurant/owner.component';
import { SalesReportComponent } from './restaurant/report/sales-report.component';
import { WharehouseReportComponent } from './restaurant/report/wharehouse-report.component';
import { StoreReportComponent } from './restaurant/report/store-report.component';
import {AuthService} from './restaurant/auth.service';
import { ViewOtherProductsComponent } from './restaurant/view-other-products.component';
import { EditOtherProductsComponent } from './restaurant/edit-other-products.component';
import { GreateOtherProductsComponent } from './restaurant/greate-other-products.component';
import { OtherProductsComponent } from './restaurant/other-products.component';



const APP_ROUTES: Routes=[
  {path: '' ,component : HomeComponent},
  {path: 'saleSession' ,component : SalesessionComponent,canActivate:[AuthService]},
  
  {path: 'settings' ,component : SettingsComponent,
  canActivate:[AuthService],
  children: [
  
  {    
     
        path: 'products',
        component:ProductsComponent ,
        outlet: 'p',
        children: [
        {
          path: 'create',
          component:CreateComponent ,
          outlet: 'c',
        },
          {
          path: 'view',
          component:ViewProductsComponent ,
          outlet: 'v',
        },
        {
          path: 'edit/:name',
          component:EditComponent ,
          outlet: 'e',
        },
       
        ]
        

    },
      {    
     
        path: 'otherProducts',
        component:OtherProductsComponent ,
        outlet: 'op',
        children: [
        {
          path: 'create',
          component:GreateOtherProductsComponent ,
          outlet: 'oc',
        },
          {
          path: 'view',
          component:ViewOtherProductsComponent ,
          outlet: 'ov',
        },
        {
          path: 'edit/:name',
          component:EditOtherProductsComponent ,
          outlet: 'oe',
        },
       
        ]
        

    },
    {
      path: 'phoneSetup',
      component:OwnerComponent ,
      outlet: 'ph',
    },
    {
      path: 'wharehouseReport',
      component:WharehouseReportComponent ,
      outlet: 'wr',
    },
    {
      path: 'salesReport',
      component:SalesReportComponent ,
      outlet: 'sr',
    },
    {
      path: 'storeReport',
      component:StoreReportComponent ,
      outlet: 'str',
    },
     {
        path: 'Store',
        component:StoreComponent ,
        outlet: 's',
         children: [
         {
           path: 'viewStore',
           component:ViewStoreComponent ,
           outlet: 'vs',
         },
        {
          path: 'createIncreadient',
          component:CreateStoreIcreadientComponent ,
          outlet: 'cI',
        },
        {
          path: 'editIncredient/:name',
          component:EditStoreIncredientComponent ,
          outlet: 'eI',
        },
        ]
    },
     {
        path: 'Wharehouse',
        component:WharehouseComponent ,
        outlet: 'w',
         children: [
        {
          path: 'view',
          component:WhareHouseGreateComponent ,
          outlet: 'v',
        },
        {
          path: 'edit/:name',
          component:WhareHouseEditComponent ,
          outlet: 'e',
        },
        ]
    },
     {
      path: 'category',
      component:CategoryComponent ,
      outlet: 'o',
       children: [
      {
        path: 'createCategory',
        component:CreateCategoryComponent ,
        outlet: 'c',
      },
      {
        path: 'editCategory/:name',
        component:EditCategoryComponent ,
        outlet: 'e',
      },
       {
        path: 'view',
        component:ViewCategoryComponent ,
        outlet: 'v',
      },
      ]
    },


  ]
}
  ];
export  const routing: ModuleWithProviders=RouterModule.forRoot(APP_ROUTES);