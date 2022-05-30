import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public proyecto:Proyecto[]=[];
  public editarProyecto:Proyecto | undefined;
  public borrarProyecto:Proyecto | undefined;
  public usuarioActual:any;

  constructor(private proyectoService:ProyectoService) { }

  ngOnInit(): void {
    //this.datosPorfolio.obtenerDatos().subscribe(data=>{
      //this.ExperienciaList=data.education;
    //})
    this.verVarAlmacenada();
    this.getProyecto();
  }
  public verVarAlmacenada():void{
    this.usuarioActual=sessionStorage.getItem('currentUser');
  }

  public getProyecto():void{
    this.proyectoService.getProyecto().subscribe({
      next:(Response: Proyecto[])=>{
        this.proyecto=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, Proyecto?:Proyecto):void{
    const container=document.getElementById("main-container");
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode==='agregar'){
      button.setAttribute('data-target','#agregarProyectoModal');

    }else if(mode==='borrar'){
      this.borrarProyecto=Proyecto;
      button.setAttribute('data-target','#borrarProyectoModal');
    }else if(mode==='editar'){

      this.editarProyecto=Proyecto;
      button.setAttribute('data-target','#editarProyecotModal');
    }

    container?.appendChild(button);
    button.click();

  }

  public onAgregarProyecto(addForm: NgForm):void{
    document.getElementById('agregar-proyecto-form')?.click();


    this.proyectoService.addProyecto(addForm.value).subscribe({
      next: (response:Proyecto)=>{
        console.log(response);
        this.getProyecto();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onEditarProyecto(Proyecto:Proyecto){
    this.editarProyecto=Proyecto;
    document.getElementById('editar-Proyecto-form')?.click();
    this.proyectoService.updateProyecto(Proyecto).subscribe({
      next: (response:Proyecto)=>{
        console.log(response);
        this.getProyecto();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }

  public onBorrarProyecto(idEdu: number):void{

   this.proyectoService.deleteProyecto(idEdu).subscribe({
      next: (response:void)=>{
        console.log(response);
        this.getProyecto();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }
}
