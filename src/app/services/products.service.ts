import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private readonly http: HttpClient) { }

  public getData(): Promise<any>{
    return this.http.get(`${environment.apiUrl}/products`).toPromise();
  }
}
