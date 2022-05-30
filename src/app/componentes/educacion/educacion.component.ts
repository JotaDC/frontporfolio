
import { HttpErrorResponse } from '@angular/common/http';
import { EducacionService } from './../../servicios/educacion.service';
import { PorfolioService } from './../../servicios/porfolio.service';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  //educacionList:any;
  public educacion:Educacion[]=[];
  public editarEducacion:Educacion | undefined;
  public borrarEducacion:Educacion | undefined;
  public usuarioActual:any;
  //public formEducacion: FormGroup;

  constructor(private educacionService:EducacionService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    //this.datosPorfolio.obtenerDatos().subscribe(data=>{
      //this.educacionList=data.education;
    //})
    /*
    this.formEducacion=this.formBuilder.group(controlsConfig: {
      tituloEdu:['',[Validators.required]],
      instituto:['',[Validators.required]],
      fechaIniEdu:['',[Validators.required]],
      fechaFinEdu:['',[Validators.required]],
      descEdu:['',[Validators.required]],
      imagenEdu:['',[Validators.required]]
    })*/

    this.verVarAlmacenada();

    this.getEducacion();
  }

  public verVarAlmacenada():void{
    this.usuarioActual=sessionStorage.getItem('currentUser');
  }

  public getEducacion():void{
    this.educacionService.getEducacion().subscribe({
      next:(Response: Educacion[])=>{
        this.educacion=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
public mensaje(){
  alert("mode");
}
  public onOpenModal(mode:String, educacion?:Educacion):void{
    const container=document.getElementById("main-container");
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode=='agregar'){

      button.setAttribute('data-target','agregarEducacionModal');
    }else if(mode=='borrar'){
      this.borrarEducacion=educacion;
      button.setAttribute('data-target','borrarEducacionModal');
    }else if(mode=='editar'){
      this.editarEducacion=educacion;
      button.setAttribute('data-target','editarEducacionModal');
    }

    container?.appendChild(button);
    button.click();

  }

  public onAgregarEducacion(addForm: NgForm):void{

    document.getElementById('agregar-educacion-form')?.click();
    console.log("entando a onagregareducaion");

    this.educacionService.addEducacion(addForm.value).subscribe({
      next: (response:Educacion)=>{
        console.log("ya pase por el servicio:"+response);
        this.getEducacion();
        console.log("ver getEducacion: "+this.getEducacion());
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onEditarEducacion(educacion:Educacion){
    this.editarEducacion=educacion;
    document.getElementById('editar-educacion-form')?.click();
    this.educacionService.updateEducacion(educacion).subscribe({
      next: (response:Educacion)=>{
        console.log(response);
        this.getEducacion();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }

  public onBorrarEducacion(idEdu: number):void{

   this.educacionService.deleteEducacion(idEdu).subscribe({
      next: (response:void)=>{
        console.log(response);
        this.getEducacion();

      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);

      }
    })
  }
}

