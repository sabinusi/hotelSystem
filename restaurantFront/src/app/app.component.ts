import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './restaurant/auth.service';

@Component({
  selector: 'app-root',
  template: `
   <ng-progress [positionUsing]="'marginLeft'" [minimum]="0.15" [maximum]="1"
                      [speed]="100" [showSpinner]="false" [direction]="'leftToRightIncreased'"
                      [color]="'red'" [trickleSpeed]="150" [thick]="false" [ease]="'easeInOutBack
 '"
         ></ng-progress>
  <nav class="navbar navbar-expand-lg  navbar-light bg-light">
    <a class="navbar-brand " [routerLink]="['']"><span style="width: 30px;border-right:1px solid black;" class="glyphicon glyphicon-home"></span></a> 
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02" *ngIf="show" >
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0" >
        <li class="nav-item active">
          <a class="nav-link" [routerLink]="['/saleSession']">SalesSession</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" (click)="goProduct()">Settings</a>
        </li>
       
      </ul>
       <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link glyphicon glyphicon-user dropdown-toggle"  data-toggle="dropdown">{{user}}</a>
                  <div class="dropdown">
 
                  <div class="dropdown-menu">
                    <a class="dropdown-item glyphicon glyphicon-lock" (click)="logOut()" >LogOut</a>

                    
                  </div>
                  </div>
               
            </li>
        </ul>
    </div>
  </nav>
  <router-outlet></router-outlet>

  `

  ,
  styles: [`
  a:active{
  	background-color:blue;
  }
  
  	;
  }
 

  `],
  providers:[AuthService]
})
export class AppComponent {
  private show:boolean
  constructor(private router:Router,private auth:AuthService) { 
    this.show=this.auth.canActivate()
  }
  
goProduct(){
  this.router.navigateByUrl('/settings/(p:products/(v:view)')
}
logOut(){
  localStorage.clear()
  location.reload()
  this.router.navigate([''])
}
private user:string=this.auth.userName()
}
