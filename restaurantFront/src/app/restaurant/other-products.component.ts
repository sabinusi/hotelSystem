import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-products',
  template: `
    <router-outlet name="ov"></router-outlet> 
    <router-outlet name="oe"></router-outlet> 
    <router-outlet name="oc"></router-outlet> 
  `,
  styles: []
})
export class OtherProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
