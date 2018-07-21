import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wharehouse',
  template: `
    <router-outlet name="v"></router-outlet> 
    <router-outlet name="e"></router-outlet> 
  `,
  styles: []
})
export class WharehouseComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
