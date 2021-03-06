import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  url:string="localhost:8080/dato/if"
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    //return this.http.get('./assets/data/data.json');
    return this.http.get<any>(this.url+"/1");
  }
}
