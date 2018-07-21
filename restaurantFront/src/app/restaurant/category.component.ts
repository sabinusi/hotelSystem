import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  template: `
     <router-outlet name="v"></router-outlet> 
     <router-outlet name="c"></router-outlet> 
     <router-outlet name="e"></router-outlet> 
  `,
  styles: []
})
export class CategoryComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
