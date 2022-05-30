import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public experiencia:Experiencia[]=[];
  public editarExperiencia:Experiencia | undefined;
  public borrarExperiencia:Experiencia | undefined;
  public usuarioActual:any;

  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    //this.datosPorfolio.obtenerDatos().subscribe(data=>{
      //this.ExperienciaList=data.education;
    //})
    this.verVarAlmacenada();
    this.getExperiencia();
  }

  public verVarAlmacenada():void{
    this.usuarioActual=sessionStorage.getItem('currentUser');
  }

  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response: Experiencia[])=>{
        this.experiencia=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, Experiencia?:Experiencia):void{
    const container=document.getElementById("main-container");
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode==='agregar'){
      button.setAttribute('data-target','#agregarExperienciaModal');

    }else if(mode==='borrar'){
      this.borrarExperiencia=Experiencia;
      button.setAttribute('data-target','#borrarExperienciaModal');
    }else if(mode==='editar'){
      this.editarExperiencia=Experiencia;
      button.setAttribute('data-target','#editarExperienciaModal');
    }

    container?.appendChild(button);
    button.click();

  }

  public onAgregarExperiencia(addForm: NgForm):void{
    document.getElementById('agregar-experiencia-form')?.click();


    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response:Experiencia)=>{
        console.log(response);
        this.getExperiencia();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onEditarExperiencia(Experiencia:Experiencia){
    this.editarExperiencia=Experiencia;
    document.getElementById('editar-Experiencia-form')?.click();
    this.experienciaService.updateExperiencia(Experiencia).subscribe({
      next: (response:Experiencia)=>{
        console.log(response);
        this.getExperiencia();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }

  public onBorrarExperiencia(idEdu: number):void{

   this.experienciaService.deleteExperiencia(idEdu).subscribe({
      next: (response:void)=>{
        console.log(response);
        this.getExperiencia();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }
}
