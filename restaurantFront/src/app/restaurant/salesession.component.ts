import { Component, OnInit } from '@angular/core';
import {StoreService} from './store.service';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-salesession',
  templateUrl: './salesession.component.html',
  styleUrls: ['./salesession.component.css'],
  providers:[StoreService]
})
export class SalesessionComponent implements OnInit {

  constructor(private service:StoreService,private popup:Popup) {
   }
   private category:any;
   private categoryProduct:any
  private customer:any='';
  private change:number;
   private priceArray:Array<any>=[]
   private nameArray=[]
   private total:number=0;
  ngOnInit() {
  	this.service.ListCategory().subscribe(

  		resp=>{
  			this.category=resp
  			

  		}

  		)
  	this.service.listProductsForSells().subscribe(

  		resp=>{
  			this.categoryProduct=resp
  			
  		})
  }
  home(){
  	this.service.listProductsForSells().subscribe(

  		resp=>{
  			this.categoryProduct=resp
  			
  		})

  }
  changeContent(data){

  	this.service.ListProductOfAgroup(data).subscribe(
  		resp=>{
  			
  			
  				this.categoryProduct=[]
          

          for (var i = 0; i < resp.product.length; ++i) {
            if (resp.product[i].avilableForSell > 0)
              this.categoryProduct.push(resp.product[i])
          }
  			
  		}
  		)
  }
  namePrice(i){
    var price=document.getElementById(i).innerHTML
    var name=document.getElementById(i+","+i).innerHTML
   this.priceArray.push(price)
   this.nameArray.push(name)
    this.total+=parseInt(price)   

    
  }
clear(){
  this.nameArray=[]
  this.priceArray=[]
  this.total=0;
}
payment(){
  
  this.popup.options.header="Payment Area"
  this.popup.options.animationDuration=0.3
  this.popup.options.showButtons=true
  this.popup.options.confirmBtnClass="btn btn-primary"
  this.popup.options.cancleBtnClass="btn btn-default"
  this.popup.options.confirmBtnContent=""
  this.popup.options.widthProsentage=30
  
  this.popup.options.animation="bounceIn"
     this.popup.show();
}
addNumber(data){ 
  var o=document.getElementById(data).innerHTML
  var num=parseInt(document.getElementById(data).innerHTML) 
  this.customer=this.customer+o


  if (parseInt(this.customer) > this.total) {
    this.change=parseInt(this.customer)-this.total
    this.popup.options.confirmBtnContent="Validate";
    
  }
}
backward(){

this.customer = this.customer.slice(0, -1);
  if (parseInt(this.customer) > this.total) {
    this.change=parseInt(this.customer)-this.total
  }else{
    this.change=0
    this.popup.options.confirmBtnContent="";
  }
}
cancelPayment(){
  this.customer=''
  this.change=0
  this.popup.options.confirmBtnContent="";
}
private pay:boolean=true;
private receipt:boolean=false;
goToReceipt(){
  this.pay=false;
  this.receipt=true;
  this.popup.options.showButtons=false;
  this.popup.options.showButtons=false;
  this.popup.options.header="Print Recept";
  this.popup.options.color="#d7dde8";
  var id=0;
  this.service.CreateIdForSellReport().subscribe(
    resp=>{
      id=resp.id
      for (var i = 0; i < this.nameArray.length; ++i) {
        this.service.CreateSaleReportTransactions(this.nameArray[i],this.priceArray[i],id).subscribe(
         resp=>{ 
           
         }
          )
      }
    })
  // descrease available number for sell
var a=this.compressArray(this.nameArray)
           for (var i = 0; i <a.length; ++i) {
             
             this.service.UpdateNumberOfProductForSell(a[i].value.trim(),a[i].count).subscribe(
               resp=>{
                 

               },Error=>{console.log(Error)})

           }

  // descrease available number for sell
}
print(data){
  document.body.innerHTML=document.getElementById(data).innerHTML;
  window.print();

}
 compressArray(original) {
 
  var compressed = [];
  // make a copy of the input array
  var copy = original.slice(0);
 
  // first loop goes over every element
  for (var i = 0; i < original.length; i++) {
 
    var myCount = 0;  
    // loop over every element in the copy and see if it's the same
    for (var w = 0; w < copy.length; w++) {
      if (original[i] == copy[w]) {
        // increase amount of times duplicate is found
        myCount++;
        // sets item to undefined
        delete copy[w];
      }
    }
 
    if (myCount > 0) {
      var a = {value:'',count:0};
      a.value = original[i];
      a.count = myCount;
      compressed.push(a);
    }
  }
 
  return compressed;
}
}
