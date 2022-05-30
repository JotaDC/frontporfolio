import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { InterceptorService } from './servicios/interceptor.service';
import { PorfolioService } from './servicios/porfolio.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarDatosComponent } from './componentes/vistas/editar-datos/editar-datos.component';
import { ProgressBarDeterminateExampleComponent } from './componentes/progress-bar-determinate-example/progress-bar-determinate-example.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    IniciarSesionComponent,
    PorfolioComponent,
    ProyectosComponent,

    EditarDatosComponent,
     ProgressBarDeterminateExampleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgCircleProgressModule.forRoot({
       // set defaults here
       radius: 100,
       outerStrokeWidth: 16,
       innerStrokeWidth: 8,
       outerStrokeColor: "#78C000",
       innerStrokeColor: "#C7E596",
       animationDuration: 300,

    })
  ],
  providers: [
    PorfolioService,
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
