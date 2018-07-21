import { Component, OnInit,ViewChild  } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {StoreService} from './store.service';
import {NgProgressService} from "ng2-progressbar";
import {MessagesService} from 'ng2-messages/ng2-messages';
@Component({
  selector: 'app-owner',
  template: `
  <popup (confirmClick)="submmit()"  #popup1>
    <div class="row">
      <div class="col-md-4">Name</div>
      <div class="col-md-8"><input type="text" name="name" [(ngModel)]="name" ></div>
         </div>
         <hr>
         <div class="row">
         <div class="col-md-4">PhoneNumber</div>
         <div class="col-md-8"><input type="number" name="phone" [(ngModel)]="phone"></div>
         </div>
         <hr>
         <div class="row">
         <div class="col-md-4">Role</div>
         <div class="col-md-8">
           <select name="role" [(ngModel)]="role" id="" >
             <option value="STORE">STORE</option>
             <option value="WHAREHOUSE">WHAREHOUSE</option>
             <option value="SUPER">SUPER</option>
           </select>
           
         </div>
         </div>
       
    
  </popup >
  <popup  #popup2 (confirmClick)="resumit()">

    <div class="container" id="main" >
    <div class="row">
      <div class="col-md-9"></div>
      <div class="col-md-3"><button class="btn btn-danger pull-right" (click)="delete()">Delete</button></div>
    </div>
    <hr>
    <div class="row" >

      <div class="col-md-4">Name</div>
      <div class="col-md-8"><input type="text" placeholder="{{person.name}}" name="name" [(ngModel)]="newPerson.name" ></div>
         </div>
         <hr>
         <div class="row">
         <div class="col-md-4">PhoneNumber</div>
         <div class="col-md-8" ><input type="text" max="9"  pattern="[0-9]{9}" placeholder="{{person.phone}}" name="phone" [(ngModel)]="newPerson.phone" ></div>
       
         </div>
         <hr>
         <div class="row">
         <div class="col-md-4">Role</div>
         <div class="col-md-8">
           <select name="role" [(ngModel)]="newPerson.role"  >
             <option value="STORE">STORE</option>
             <option value="WHAREHOUSE">WHAREHOUSE</option>
             <option value="SUPER">SUPER</option>
           </select><span>{{person.role}}</span>
           
         </div>
         </div>
       

    </div>
</popup>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-5">
        <button class="btn btn-success" (click)="informer()">NewInformer</button>
      </div>
    </div>
   <hr>
  
      <div class="row">
        <div class="col-md-12">
          <div style="z-index: 10000;position: absolute;width: 40%;margin-left: 25%;">

          <ng2-messages></ng2-messages>
         </div>
          <div *ngFor="let item of owner,let i=index" style=" box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 150px; display:inline-block; margin:2px;" >
            <img class="img-thumbnail" (click)="onCellClick(i)" src="./assets/p.png" alt="Avatar" width="100%" height="100">
            <div  style="padding: 2px 16px;">
              <h4>{{item.name}}</h4> 
              <p class="glyphicon glyphicon-phone">{{item.phoneNumber}}</p> 
              <p class="glyphicon glyphicon-flag">{{item.role}}</p> 
            </div>
          </div>
        </div>
      </div>
     
      
      
  `,
  styles: [
  `
  :host /deep/ popup #ng2-opd-popup-main { 
  top: 0 !important;
   }
   :host /deep/ popup #main{ 
  margin-top:  -30px !important;
  width: 300px !important;
  
   },
  .so:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    height: 3000px;
  }
   

  `],
  providers:[StoreService]
  
})
export class OwnerComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;

private name:string;
private phone:string;
private role:any;
private owner:any;
constructor(public msg:MessagesService,private pService: NgProgressService,private service:StoreService,private popup:Popup) { }
ngOnInit(){
  this.service.owner().subscribe(
   resp=>{ this.owner=resp
     console.log(this.owner)
   }
    )
}
informer(){
  this.popup.options.header="AlertPersonRegistration"
  this.popup.options.animationDuration=0.3
  this.popup.options.showButtons=true
  this.popup.options.confirmBtnClass="btn btn-primary"
  this.popup.options.cancleBtnClass="btn btn-default"
  this.popup.options.confirmBtnContent="Submit"
  this.popup.options.widthProsentage=50
  
  this.popup.options.animation="fadeInUp"
     this.popup1.show();
  
}

private person={
      name:'',
      phone:'',
      role:''
    }
    private newPerson={
          name:'',
          phone:'',
          role:''
        }

  public onCellClick(data: any): any {
    
    this.person.name=this.owner[data].name
    this.person.phone=this.owner[data].phoneNumber
    this.person.role=this.owner[data].role
    
  
     this.popup.options.color="#15d36a";
    this.popup.options.header="Edit_Informer"
    this.popup.options.animationDuration=0.3
    this.popup.options.showButtons=true
    this.popup.options.confirmBtnClass="btn btn-primary"
    this.popup.options.cancleBtnClass="btn btn-default"
    this.popup.options.confirmBtnContent="Submit";
    this.popup.options.widthProsentage=40;
    this.popup.options.animation="fadeInLeft"
       this.popup2.show();
    console.log(this.person)

  }
  submmit(){
    console.log(this.name)
    console.log(this.phone)
    console.log(this.role)
    
    if (this.name && this.phone && this.role) {
      if (/^[(]{0,1}[0-9]{3}[)]{0,1}[\\]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3}$/.test(this.phone)) {
        this.pService.start();
         this.service.createOwnet(this.name,this.phone,this.role).subscribe(
        resp=>{
          this.popup.hide()
          alert("succesfull"
            )
          this.pService.done();
        
        return
      },Error=>{if(Error.status==400){this.msg.error('Some one with this phoneNumber already exist')}}
      )
         return
        
      }else{
     this.msg.info("please enter phoneNumber of this format (0**********)")
      
      return
    }
  }
    else{
      this.msg.info('please fill all field')
    }
  
  }
  delete(){
    this.pService.start()
    this.service.deleteManagerAlert(this.person.phone).subscribe(
      resp=>{
        alert('succesfull')
        this.popup2.hide()
        this.pService.done()
      }
      )
  }
  resumit(){
    console.log(this.newPerson.role)
    console.log(this.newPerson.name)
    console.log(this.newPerson.phone)
    if (this.newPerson.name !="" && this.newPerson.role !="" && this.newPerson.phone !="")  {
      this.pService.start()
      this.service.updateALert(this.person.phone,this.newPerson.name,this.newPerson.phone,this.newPerson.role).subscribe(
        resp=>{
          alert("succesfull")
          this.pService.done()
        },Error=>{if(Error.status==400){this.msg.info('Some one with this phoneNumber already exist')}})
      return
    }else if(this.newPerson.name !="" && this.newPerson.role =="" && this.newPerson.phone ==""){
      this.pService.start()
      this.service.updateALert(this.person.phone,this.newPerson.name,this.person.phone,this.person.role).subscribe(
        resp=>{
          alert("succesfull")
          this.pService.done()
          location.reload()

        },Error=>{if(Error.status==400){this.pService.done(); this.msg.error('Some one with this phoneNumber already exist')}})
      return
    }
    else if(this.newPerson.name !="" && this.newPerson.role !="" && this.newPerson.phone ==""){
             this.pService.start()
          this.service.updateALert(this.person.phone,this.newPerson.name,this.person.phone,this.newPerson.role).subscribe(
            resp=>{
              alert("succesfull")
              this.pService.done();
              location.reload()
            },Error=>{if(Error.status==400){this.pService.done();this.msg.error('Some one with this phoneNumber already exist')}})
          return
        }
        else if(this.newPerson.name =="" && this.newPerson.role !="" && this.newPerson.phone ==""){
          this.pService.start();
              this.service.updateALert(this.person.phone,this.person.name,this.person.phone,this.newPerson.role).subscribe(
                resp=>{
                  alert("succesfull")
                  this.pService.done();
                  location.reload()
                },Error=>{if(Error.status==400){this.pService.done();this.msg.error('Some one with this phoneNumber already exist')}})
              return
            }
            else if(this.newPerson.name =="" && this.newPerson.role =="" && this.newPerson.phone !=""){
              if (/^[(]{0,1}[0-9]{4}[)]{0,1}[\\]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3}$/.test(this.newPerson.phone)) {
                this.pService.start()
                this.service.updateALert(this.person.phone,this.person.name,this.newPerson.phone,this.person.role).subscribe(
                    resp=>{
                      alert("succesfull")
                      this.pService.done()
                      location.reload()
                    },Error=>{if(Error.status==400){this.pService.done();this.msg.error('Some one with this phoneNumber already exist')}})
                return
              }else{
                  this.msg.error("inter valid phoneNumber")
                  return
                }
                }else {this.msg.error("missing somefields")}
    

  }
}
