import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:4000/api/productos/';

  constructor(private htpp: HttpClient) { }

  posProduct(data: any): Observable<any>{
    return this.htpp.post(this.url,data) 
  }

  getProduct(): Observable<any> {
    return this.htpp.get(this.url);
  }

  putProducto(data : any, id: string): Observable<any> {
    return this.htpp.put<any>(this.url + id, data);
  }

  deleteProducto(id: string): Observable<any> {
    return this.htpp.delete(this.url + id);
  }

  obtenerProducto(id: any): Observable<any> {
    return this.htpp.get(this.url + id);
  }

}
