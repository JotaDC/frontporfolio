
import { Usuario } from './../../models/usuario';
import { AcercaDeService } from './../../servicios/acerca-de.service';
import { PorfolioService } from './../../servicios/porfolio.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  public usuario: Usuario | undefined;
  public editUsuario:Usuario | undefined;
  public usuarioActual:any;
  //miPorfolio:any;
  constructor(private acercaDeService:AcercaDeService) { }

  ngOnInit(): void {
    this.verVarAlmacenada();
    this.getUser();

  }
  public verVarAlmacenada():void{
    this.usuarioActual=sessionStorage.getItem('currentUser');
  }
  public getUser():void{
    this.acercaDeService.getuser().subscribe({
      next: (response:Usuario) =>{
        this.usuario=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, usuario?:Usuario):void{
    const container=document.getElementById("main-container");
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode=='datos'){
      this.editUsuario=usuario;
      button.setAttribute('data-target','editarDatosModal');


    }

    container?.appendChild(button);
    button.click();

  }

  public onEditarUsuario(usuario:Usuario){
    this.editUsuario=usuario;
    document.getElementById('editar-usuario-form')?.click();
    this.acercaDeService.updateUsuario(usuario).subscribe({
      next: (response:Usuario)=>{
        console.log(response);
        this.getUser();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }


}
