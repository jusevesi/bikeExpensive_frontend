import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public coupons: any = [];
  public amount = 0;
  public cartList: any = [];

  constructor(private readonly request: CouponsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCoupons();
    this.cartService.getCart().subscribe(cart => {
      this.cartList = cart;
      localStorage.setItem("cart",JSON.stringify(cart));
      this.amount = this.cartList.map((cart: any) => cart.amount).reduce((previous: any, current: any) => previous + current, 0);
    });
  }

  private async getCoupons(): Promise<void> {
    this.request.getData().then((response: any) => {
      this.coupons = response.coupons;
    }).catch((error: any) => {
      console.log(error);
    })
  }
}
