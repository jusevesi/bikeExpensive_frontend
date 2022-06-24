import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any = [];
  public cartList: any = [];

  constructor(private readonly request: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private async getProducts(): Promise<void> {
    this.request.getData().then((response: any) => {
      this.products = response.products;
    }).catch((error: any) => {
      console.log(error);
    })
  }

  public addToCart(product: any) {
  const existProduct = this.cartList.findIndex( (el : any) => el.id === product.id);
    if (existProduct >= 0) {
      this.cartList[existProduct] = {
        ...product,
        amount: this.cartList[existProduct].amount + 1
      }
    } else {
      this.cartList.push({...product, amount: 1});
    }
    this.cartService.updateCart(this.cartList);
  }
}
