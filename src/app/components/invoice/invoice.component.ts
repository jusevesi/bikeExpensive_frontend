import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CouponsService } from '../../services/coupons.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  public cartList: any = [];
  public total = 0; 
  public descuento =0;
  public couponForm = new FormGroup({
    coupon: new FormControl()
  })
  public userForm = new FormGroup({
    nombre: new FormControl(),
    email: new FormControl(),
    direccion: new FormControl()
  })

  constructor(private couponsService : CouponsService, public invoiceService: InvoiceService) { }

  ngOnInit(): void {
    const cart = localStorage.getItem("cart");
    this.cartList = cart ? JSON.parse(cart) : [];
    this.total = this.cartList.map((item: any) => item.precio * item.amount).reduce((previous: any, current: any) => previous + current, 0);
  }

  public async postInvoice(): Promise<void>  {
    const {nombre, email, direccion} = this.userForm.value;
    const body = {
      id: Math.random(),
      products : this.cartList,
      total: this.total,
      descuento: this.descuento,
      nombre,
      email,
      direccion
    }
    console.log(body);
    this.invoiceService.postData(body).then((response: any)=>{
      console.log("Compra creda!")
    })
  }

  public async applyCoupon() {
    try {
      const couponList = await this.couponsService.getData();
      const coupon = couponList.coupons.find((coupon: any) => coupon.id === this.couponForm.value.coupon);
      this.descuento = this.total*coupon.descuento/100;
      console.log(this.descuento)
    } catch (error) {
      console.log(error);
    }
  } 
}
