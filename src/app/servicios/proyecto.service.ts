import { Proyecto } from './../models/proyecto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getProyecto():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.apiServerUrl}/proyecto/all`);
  }

  public addProyecto(Proyecto:Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(`${this.apiServerUrl}/proyecto/add`, Proyecto);
  }

  public updateProyecto(Proyecto:Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.apiServerUrl}/proyecto/update`, Proyecto);
  }

  public deleteProyecto(ProyectoId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/proyecto/delete/${ProyectoId}`);
  }

}
