import { AutenticacionService } from './autenticacion.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private autenticacionServicio:AutenticacionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    var currentUser=this.autenticacionServicio.UsuarioAutenticado;
    console.log("El token dentro de interceptor="+currentUser.accesstoken)
    if(currentUser && currentUser.accesstoken)
    {
      console.log("estoy dentro de bloque if");
        req=req.clone({
          setHeaders:{
            Authorization: `Bearer ${"currentUser.accessToken"}`
          }
        })
    }
    console.log("Interceptor está corriendo "+JSON.stringify(currentUser));
    return next.handle(req);
  }
}
