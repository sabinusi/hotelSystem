import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  template: `
   
     
    <router-outlet name="v"></router-outlet> 
    <router-outlet name="e"></router-outlet> 
    <router-outlet name="c"></router-outlet> 
  `,
  styles: []
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
