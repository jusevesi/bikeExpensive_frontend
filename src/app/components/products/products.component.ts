import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any = [];

  constructor(private readonly request: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private async getProducts(): Promise<void> {
    this.request.getData().then((response: any) => {
      this.products = response.products;
      console.log(this.products)
    }).catch((error: any) => {
      console.log(error);
    })
  }
}
