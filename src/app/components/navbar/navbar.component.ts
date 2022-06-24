import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public coupons: any = [];

  constructor(private readonly request: CouponsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCoupons();
  }

  private async getCoupons(): Promise<void> {
    this.request.getData().then((response: any) => {
      this.coupons = response.coupons;
    }).catch((error: any) => {
      console.log(error);
    })
  }
}
