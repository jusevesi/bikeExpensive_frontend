import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private readonly http: HttpClient) { }

  public postData(body:any) : Promise<any> {
    return this.http.post(`${environment.apiUrl}/invoices`, body).toPromise();
  }
}
