import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store',
  template: `

           <router-outlet name="vs"></router-outlet> 
           <router-outlet name="cI"></router-outlet> 
           <router-outlet name="eI"></router-outlet> 
           
           

  `,
  styles: []
  
})
export class StoreComponent implements OnInit {
 

  constructor() {
    
   }


  public ngOnInit():void {
   
    
}


}