import { AutenticacionService } from './../../servicios/autenticacion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, private autenticacionService:AutenticacionService, private ruta:Router) {
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required, Validators.minLength(1)]],
        deviceInfo:this.formBuilder.group({
          deviceId:["17867868768"],
          deviceType:["DEVICE_TYPE_ANDROID"],
          notificationToken:["67657575eececc34"]

        })
      }
    )
  }

  ngOnInit(): void {
  }

  get Usuario(){
    return this.form.get('username');
  }

  get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
    //aqui simulo login dado que por algun motivo el api rest manda token pero en el depurador del navegaros dice error 200.
    /*if(this.Password?.value==="admin" && this.Usuario?.value==="admin"){
      this.ruta.navigate(['/porfolio']);

    }*/
    event.preventDefault;
    console.log(this.form.value);
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/porfolio']);

    })


  }

}

