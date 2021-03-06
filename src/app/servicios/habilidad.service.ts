import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../models/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getHabilidad():Observable<Habilidad[]>{
    return this.http.get<Habilidad[]>(`${this.apiServerUrl}/skill/all`);
  }

  public addHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.post<Habilidad>(`${this.apiServerUrl}/skill/add`, habilidad);
  }

  public updateHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.put<Habilidad>(`${this.apiServerUrl}/skill/update`, habilidad);
  }

  public deleteHabilidad(habilidadId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/skill/delete/${habilidadId}`);
  }

}
