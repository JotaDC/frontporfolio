
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';


import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
  styleUrls: ['./editar-datos.component.css']
})
export class EditarDatosComponent implements OnInit {
  public usuario: Usuario | undefined;
  public editUsuario:Usuario | undefined;
  public usuarioActual:any;
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, private acercaDeService:AcercaDeService) {
    this.form=this.formBuilder.group(
      {
        nombre:['',[Validators.required]],
        apellido:['',[Validators.required, Validators.minLength(1)]],
        titulo:['',[Validators.required]],
        descripcion:['',[Validators.required]],
        fotoPerfil:['',[Validators.required]],
        fotoFondo:['',[Validators.required]],
      }
    )
  }

  ngOnInit(): void {

    this.getUser();


  }

  get Nombre(){
    return this.form.get('nombre');
  }

  get Apellido(){
    return this.form.get('apellido');
  }

  get Titulo(){
    return this.form.get('titulo');
  }
  get Descripcion(){
    return this.form.get('descripcion');
  }
  get FotoPerfil(){
    return this.form.get('fotoPerfil');
  }
  get FotoFondo(){
    return this.form.get('fotoFondo');
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

  onEnviar(event:Event){

    /*event.preventDefault;
    console.log(this.form.value);
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/porfolio']);

    })

*/
  }
}
