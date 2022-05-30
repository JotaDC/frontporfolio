import { AutenticacionService } from './autenticacion.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private autenticacionServicio:AutenticacionService, private rutas:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return true;
/*
 let currentUser=this.autenticacionServicio.UsuarioAutenticado;
      if(currentUser && currentUser.accessToken){
        return true;
      }else{
        this.rutas.navigate(['/porfolio']);
        return true;
      }
      */
  }

}
