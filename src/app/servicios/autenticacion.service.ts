import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url=environment.apiBaseUrl;

  currentUserSubject: BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
   console.log(this.currentUserSubject);
  }

   IniciarSesion(credenciales:any):Observable<any>
   {
    //const params = new HttpParams().set('username', 'admin').set('password', 'admin');
    //const username='admin';
    //const password='admin';
    //  return this.http.post(this.url+'/users/signin',{params})
    return this.http.post(this.url+'/users/signin', credenciales,{responseType: 'text'}).pipe(map(data=>{

        sessionStorage.setItem('currentUser',JSON.stringify(data));
        console.log(this.currentUserSubject);
        this.currentUserSubject.next(data);
        return data;
      }))
   }
   get UsuarioAutenticado()
   {
     console.log("ver usuario autenticado: "+this.currentUserSubject.value)
     return this.currentUserSubject.value;
   }
}
