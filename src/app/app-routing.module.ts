
import { GuardGuard } from './servicios/guard.guard';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarDatosComponent } from './componentes/vistas/editar-datos/editar-datos.component';

const routes: Routes = [
  {path:'',redirectTo:'porfolio',pathMatch:'full'},

  {path:'porfolio',component:PorfolioComponent,canActivate:[GuardGuard]},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'editar-datos', component:EditarDatosComponent},
  {path:'**',redirectTo:'porfolio',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
