import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';
@Injectable()
export class StoreService {

  constructor(private http:Http) { }
public token=localStorage.getItem("token")
public createStoreIncredient(data1,data2,data3,data4){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	urlSearchParams.append('measure_units', data1);
	urlSearchParams.append('availableUnits', data2);
	urlSearchParams.append('name', data3);
	urlSearchParams.append('normal_units', data4);
	
	let body = urlSearchParams;

	 
	        return this.http.post( 'http://localhost:8000/restaurant/createIncredient',body,{ headers:headers}).map(
	            (res: Response) => res.json() 
	                  
	        );
}
public ListIncredientsInstore(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListIncredientInstore",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public ListSpecificIncredientsInstore(name:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListSpecificIncredientInstore/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public updateSpecificIncredientInstore(Sname:any,units:any,measure_units:any,availableUnits,name:any){
	
	let ur=new URLSearchParams()
	ur.append('normal_units',units)
	ur.append('measure_units',measure_units)
	ur.append('availableUnits',availableUnits)
	ur.append('name',name)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	headers.append('Authorization','jwt '+this.token)

	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/restaurant/UpdateSpecificIncredientInstore/'+Sname,body,options).map((resp:Response)=>resp.json());
}
public deleteIncredientInStore(data:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)

  return this.http.delete( "http://localhost:8000/restaurant/DeleteSpecificIncredientInstore/"+data,{ headers:headers}).map((resp:Response)=>resp.json());
}
public createWhareHouseIncredient(data1,data2,data3){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	urlSearchParams.append('name', data1);
	urlSearchParams.append('normalrange', data2);
	urlSearchParams.append('available', data3);
	
	
	let body = urlSearchParams;
	 
	        return this.http.post( 'http://localhost:8000/restaurant/createWharehouse',body,{ headers:headers}).map(
	            (res: Response) => res.json() 
	                  
	        );
}
public deleteIncredientInWharehouse(data:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
  return this.http.delete( "http://localhost:8000/restaurant/DeleteSpecificIncredientWharehouse/"+data,{ headers:headers}).map((resp:Response)=>resp.json());
}
public retriveNameFromWhareHouse(data:string){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/RetriveWharehouseIncredientName/"+data,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public ListIncredientsInWhareHouse(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListWhareHouseData",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public ListSpecificIncredientsWharehouse(name:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/RetriveSpecificWharehouseName/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public updateSpecificIncredientWhareHouse(Sname:any,normalRange:any,available:any){
	let ur=new URLSearchParams()
	ur.append('name',Sname)
	ur.append('normalrange',normalRange)
	ur.append('available',available)
	
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	headers.append('Authorization','jwt '+this.token)
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/restaurant/UpdateSpecificIncredientInWhareHouse/'+Sname,body,options).map((resp:Response)=>resp.json());
}
public createCategory(data1,data2){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	urlSearchParams.append('pic', data1);
	urlSearchParams.append('name', data2);
	
	
	
	let body = urlSearchParams;
	 
	        return this.http.post( 'http://localhost:8000/restaurant/Category',body,{ headers:headers}).map(
	            (res: Response) => res.json() 
	                  
	        );
}
public ListCategory(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListCategory",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public RetriveCategory(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/RetriveCategory/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}

public updateCategory(name,pic){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
let urlSearchParams = new FormData()
urlSearchParams.append('name', name);
urlSearchParams.append('pic', pic);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/restaurant/UpdateCategory/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
public createProduct(price,name,pic,category,increadient:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	urlSearchParams.append('price', price);
	urlSearchParams.append('name', name);
	urlSearchParams.append('pic', pic);
	urlSearchParams.append('category', category);
	urlSearchParams.append('increadients',  increadient);
	
	
	
	let body = urlSearchParams;
	 
	        return this.http.post( 'http://localhost:8000/restaurant/createProduct',body,{ headers:headers}).map(
	            (res: Response) => res.json() 
	                  
	        );
}
public listProducts(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 return this.http.get("http://localhost:8000/restaurant/ListProduct",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public listProductsForSells(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 return this.http.get("http://localhost:8000/restaurant/ListProductForSell",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public updateProductIncredient(inredient:any,name:any,){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	
	let body={ "increadients": 
        inredient
    
          }
	return this.http.put('http://localhost:8000/restaurant/UpdateIncredientProduct/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
public RetriveProduct(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/retrivewProduct/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public deleteCategory(data:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
  return this.http.delete( "http://localhost:8000/restaurant/DeleteCategory/"+data,{ headers:headers}).map((resp:Response)=>resp.json());
}
public deleteProduct(data:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
  return this.http.delete( "http://localhost:8000/restaurant/DeleteProduct/"+data,{ headers:headers}).map((resp:Response)=>resp.json());
}
public UpdateAvailableNumber(name,value){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/UpdateAvailableProductForSell/?name="+name+"&&value="+value,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public UpdateAvailableNumberOfIncredientInStore(name,value){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/UpdateAvailabiltyInStore?name="+name+"&&value="+value,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public ListProductOfAgroup(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListProductBasedOnCategory/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}

public ListNumberIncredient(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListNumberOfProductIncredient/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );

}
public CreateStoreReport(inredientName,status,amount,reasons){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	urlSearchParams.append('inredientName', inredientName);
	urlSearchParams.append('status', status);
	urlSearchParams.append('amount', amount);
	urlSearchParams.append('reasons', reasons);
	
	
	let body = urlSearchParams;
		    return this.http.post("http://localhost:8000/restaurant/CreateStoreReport",body,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );

}
public CreateIdForSellReport(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()

	let body = urlSearchParams;
		    return this.http.post("http://localhost:8000/restaurant/CreateSalesReport",body,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public CreateSaleReportTransactions(product,price,saleid){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	
	urlSearchParams.append('product', product);
	urlSearchParams.append('price', price);
	urlSearchParams.append('saleid', saleid);
	
	
	let body = urlSearchParams;
		    return this.http.post("http://localhost:8000/restaurant/CreateSalesReportTransaction",body,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );

}
public CreateWhareHouseReport(inredientName,status,reasons,normalBefore,normalAfter,availableBefore,availableAfter){
	 let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	
	urlSearchParams.append('inredientName', inredientName);
	urlSearchParams.append('status', status);
	urlSearchParams.append('reasons', reasons);
	urlSearchParams.append('normalBefore', normalBefore);
	urlSearchParams.append('normalAfter', normalAfter);
	urlSearchParams.append('availableBefore', availableBefore);
	urlSearchParams.append('availableAfter', availableAfter);
	
	
	
	let body = urlSearchParams;
		    return this.http.post("http://localhost:8000/restaurant/WharehouseReport",body,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );

}
public saleReport(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewSalesReport",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public storeReport(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewStoreReport",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public whareReport(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewWhareHouseReport",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public owner(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewManagerAlert",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public createOwnet(name,phone,role){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	
	urlSearchParams.append('name', name);
	urlSearchParams.append('phoneNumber', phone);
	urlSearchParams.append('role', role);
	
	
	let body = urlSearchParams;
		    return this.http.post("http://localhost:8000/restaurant/CreateManagerAlert",body,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );

}
public viewWhareHouseReportBasedOnDate(start,end){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewWhareHouseReportDependOnDate?start="+start+"&&end="+end,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public viewStoreReportBasedOnDate(start,end){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewStoreReportDependOnDate?start="+start+"&&end="+end,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public viewSalesReportBasedOnDate(start,end){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ViewSalesReportDependOnDate?start="+start+"&&end="+end,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public updateALert(name,newname,phone,role){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
let urlSearchParams = new FormData()
urlSearchParams.append('name', newname);
urlSearchParams.append('phoneNumber', phone);
urlSearchParams.append('role', role);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/restaurant/UpdateManagerAlert/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
public deleteManagerAlert(data:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
  return this.http.delete( "http://localhost:8000/restaurant/DeleteManagerAlert/"+data,{ headers:headers}).map((resp:Response)=>resp.json());
}
public updateMeasurableUnitInStore(name,units){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
let urlSearchParams = new FormData()
urlSearchParams.append('measure_units', units);
;

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/restaurant/UpdateMeasurebleUnitsInStore/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
public getNameFromWharehouseReport(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/GetNameInWharehouseReport?name="+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public getMeasurableUnitOfIncredient(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/GetMeasurableUnitsOfIncredient/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public updateProduct(name,price,category,increadients:any){

	let ur=new URLSearchParams()
	ur.append('price',price)
	ur.append('category',category)
	ur.append('increadients',increadients)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	headers.append('Authorization','jwt '+this.token)
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/restaurant/UpdateProduct/'+name,body,options).map((resp:Response)=>resp.json());
}
public updateProductPic(name,pic){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
let urlSearchParams = new FormData()
urlSearchParams.append('pic', pic);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/restaurant/UpdateProductPic/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
public UpdateNumberOfProductForSell(name,value){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/UpdateAvailableProductForSellFromPOS?name="+name+"&&value="+value,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public createOtherProducts(name,pic,incedient){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	 	let urlSearchParams = new FormData()
	urlSearchParams.append('name', name);
	urlSearchParams.append('pic', pic);
	urlSearchParams.append('available', incedient);
	
	
	let body = urlSearchParams;
	 
	        return this.http.post( 'http://localhost:8000/restaurant/CreateOtherProducts',body,{ headers:headers}).map(
	            (res: Response) => res.json() 
	                  
	        );
}
public updateOtherProductIncredient(inredient:any,name:any,){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
	
	let body={ "incedient": 
        inredient
    
          }
	return this.http.put('http://localhost:8000/restaurant/UpdateIncredientInOtherProducts/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
public getOtherProducts(){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListOtherProducts",{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public getOtherProductsIncredients(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/ListIncredientInOtherProducts/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public retriveSpecificOtherProduct(name){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
		    return this.http.get("http://localhost:8000/restaurant/RetriveOtherProduct/"+name,{ headers:headers}).map(
	(res:Response)=>res.json()
	    );
}
public deleteOtherProducts(name:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)

  return this.http.delete( "http://localhost:8000/restaurant/deleteOtherProduct/"+name,{ headers:headers}).map((resp:Response)=>resp.json());
}
public updatePicOtherProduct(name:any,pic:any){
	let headers=new Headers()
	headers.append('Authorization','jwt '+this.token)
let urlSearchParams = new FormData()
urlSearchParams.append('pic', pic);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/restaurant/UpdatePicInOtherProducts/'+name,body,{ headers:headers}).map((resp:Response)=>resp.json());
}
}
