import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidad:Habilidad[]=[];
  public editarHabiliadad:Habilidad | undefined;
  public borrarHabilidad:Habilidad | undefined;
  public usuarioActual:any;

  constructor(private habilidadService:HabilidadService) { }

  ngOnInit(): void {
    //this.datosPorfolio.obtenerDatos().subscribe(data=>{
      //this.habilidadList=data.education;
    //})
    this.verVarAlmacenada();
    this.getHabilidad();
  }

  public verVarAlmacenada():void{
    this.usuarioActual=sessionStorage.getItem('currentUser');

  }

  public getHabilidad():void{
    this.habilidadService.getHabilidad().subscribe({
      next:(Response: Habilidad[])=>{
        this.habilidad=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, Habilidad?:Habilidad):void{
    const container=document.getElementById("main-container");
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode==='agregar'){
      button.setAttribute('data-target','#agregarHabilidadModal');

    }else if(mode==='borrar'){
      this.borrarHabilidad=Habilidad;
      button.setAttribute('data-target','#borrarHabilidadModal');
    }else if(mode==='editar'){
      this.editarHabiliadad=Habilidad;
      button.setAttribute('data-target','#editarHabilidadModal');
    }

    container?.appendChild(button);
    button.click();

  }

  public onAgregarHabilidad(addForm: NgForm):void{
    document.getElementById('agregar-habilidad-form')?.click();


    this.habilidadService.addHabilidad(addForm.value).subscribe({
      next: (response:Habilidad)=>{
        console.log(response);
        this.getHabilidad();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onEditarHabilidad(Habilidad:Habilidad){
    this.editarHabiliadad=Habilidad;
    document.getElementById('editar-Habilidad-form')?.click();
    this.habilidadService.updateHabilidad(Habilidad).subscribe({
      next: (response:Habilidad)=>{
        console.log(response);
        this.getHabilidad();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }

  public onBorrarHabilidad(idEdu: number):void{

   this.habilidadService.deleteHabilidad(idEdu).subscribe({
      next: (response:void)=>{
        console.log(response);
        this.getHabilidad();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }
}
