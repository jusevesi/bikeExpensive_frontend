import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new Subject();

  constructor() { }

  public getCart(): Observable<any> {
    return this.cart.asObservable();
  }

  public updateCart( product:any ): void {
    this.cart.next(product);
  }
  
}
