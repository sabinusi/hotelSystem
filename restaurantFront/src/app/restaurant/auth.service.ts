import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {CanActivate,Router} from '@angular/router'

import { Http, Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';
@Injectable()
export class AuthService implements CanActivate {

  constructor(private http:Http,private route:Router) { }
  canActivate(){
  	if ( localStorage.getItem('token')) {
  		
  		return true
  	}else 
  	
  	this.route.navigate([''])
  	
  	return false
  }
public logIn(username,password){

	 	let urlSearchParams = new FormData()
	urlSearchParams.append('username', username);
	urlSearchParams.append('password', password);
	let body = urlSearchParams;
	 
    return this.http.post( 'http://localhost:8000/api-token-auth/',body).map(
    (res: Response) => res.json() 
          
);

}
public userName():string{
  return localStorage.getItem('user')
}

}
