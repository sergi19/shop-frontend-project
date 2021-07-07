import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('products') products;

  openDesc: boolean = false;
  icon: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openDescription() {
    this.openDesc = !this.openDesc;
    this.openDesc ? this.icon = true : this.icon = false;
  }

}
