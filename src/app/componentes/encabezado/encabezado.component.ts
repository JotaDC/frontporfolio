import { AutenticacionService } from './../../servicios/autenticacion.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor( private http:HttpClient, private autenticacionService:AutenticacionService, private ruta:Router) { }

  ngOnInit(): void {

  }
public cerrar():void{
  sessionStorage.removeItem('currentUser');

  this.ruta.navigate(['/iniciar-sesion']);



}

public ver():boolean{
  if(sessionStorage.length!=0){
    return true;
  }else{
    return false;
  }
}
}
