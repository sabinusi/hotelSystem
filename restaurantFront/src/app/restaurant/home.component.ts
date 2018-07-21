import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {MessagesService} from 'ng2-messages/ng2-messages';



@Component({
  selector: 'app-home',
  template: `
  <div class="container py-5" id="wa" *ngIf="!show">
      <div class="row">
          <div class="col-md-12">
              <div class="row">
                  <div class="col-md-6 mx-auto">

                      <span class="anchor" id="formLogin"></span>

                      <!-- form card login -->
                      <div class="card rounded-0">
                          <div class="card-header">
                              <h3 class="mb-0" id="wa" style="color:white;">Login</h3>
                          </div>
                          <div class="card-body">
                              <form class="form" role="form" #fo="ngForm" (ngSubmit)="login(fo.value)"  autocomplete="off" id="formLogin">
                                  <div class="form-group">
                                      <label for="uname1">Username</label>
                                      <input type="text" class="form-control form-control-lg rounded-0" name="username" ngModel id="uname1" required>
                                  </div>
                                  <div class="form-group">
                                      <label>Password</label>
                                      <input type="password" class="form-control form-control-lg rounded-0" id="pwd1" ngModel required autocomplete="new-password" name="password">
                                  </div>
                                  <div>
                                      <label class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input">
                                        <span class="custom-control-indicator"></span>
                                        <span class="custom-control-description small">Remember me on this computer</span>
                                      </label>
                                      <ng2-messages></ng2-messages>
                                  </div>
                                  <button type="submit" class="btn btn-success btn-lg float-right" [disabled]="!fo.valid" >Login</button>
                              </form>
                          </div>
                          <!--/card-block-->
                      </div>
                      <!-- /form card login -->

                  </div>


              </div>
              <!--/row-->

          </div>
          <!--/col-->
      </div>
      <!--/row-->
  </div>
  <!--/container-->
  <!-- bacground image area -->
  <div class="container-fluid" *ngIf="show" style="height: 100%;width: 100%;" id="wa1">
    <div class="row" >
      <div class="col-md-2"></div>
      <div class="col-md-10" >

        <video id="videobcg" preload="auto" autoplay="true" loop="loop" muted="muted" volume="0">
             <source src="./assets/v1.MP4" type="video/mp4">
             <source src="./assets/v.MP4" type="video/mp4">
             
                  Sorry, your browser does not support HTML5 video.
        </video>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
  <!-- bacground image area -->

  `,
  styles: [`
  #videobcg { 
       margin-top:8%;
       margin-top:8%;
       margin-bottom: 8%;
       border-radius: 10px;
       top: 0px;
       left: 0px;
       box-shadow: 4px 4px 4px 4px solid white;
       min-width:60%;
       width:100%;

       
       width: 100%;
       height:100%;
       
       width: auto;
       height: auto;
       z-index: -1000;
       overflow: hidden;
  }
  #wa1{
  background-image:url('./assets/wa.jpg');
  /* Full height */
      height: 100px; 


      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      
}
#wa{
  background-image:url('./assets/wa.jpg');
  /* Full height */
      height: 100%; 


      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-size: 100%;
}

  `],
  providers:[AuthService]
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,private route:Router,public msg:MessagesService,) { }

  ngOnInit() {
  }
  private show:boolean=this.auth.canActivate()
login(data){
  
  this.auth.logIn(data.username,data.password).subscribe(
    resp=>{
      
      localStorage.setItem('token',resp.token)
      localStorage.setItem('user',data.username)
      this.route.navigate(['/saleSession'])
      location.reload()
      
    },error=>{if (error.status == 400) {
      this.msg.error("failed to login with provided crediential")
      
    } }
    )
}

}
