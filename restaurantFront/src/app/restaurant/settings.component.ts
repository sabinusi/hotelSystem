import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router:Router) { }
  

  ngOnInit() {
  	
  	}
  
  goStore(){
  	this.router.navigateByUrl('/settings/(s:Store/(vs:viewStore)')


  }
  goWhareHouse(){
    this.router.navigateByUrl('/settings/(w:Wharehouse/(v:view))')
  }
  goCategory(){
    this.router.navigateByUrl('/settings/(o:category/(v:view))')
  }
  goProduct(){
    this.router.navigateByUrl('/settings/(p:products/(v:view))')
  }
  
  goPhone(){
    this.router.navigateByUrl('/settings/(ph:phoneSetup)')

  }
  sales(){
    this.router.navigateByUrl('/settings/(sr:salesReport)')
  }
  wharehouseReport(){
    this.router.navigateByUrl('/settings/(wr:wharehouseReport)')
  }
  storeReport(){
    this.router.navigateByUrl('/settings/(str:storeReport)')
  }
  
   goOtherProducts(){
    this.router.navigateByUrl('/settings/(op:otherProducts/(ov:view))')
  }
}
