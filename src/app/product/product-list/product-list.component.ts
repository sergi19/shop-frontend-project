import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ProductService } from '../product.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: IProduct[];

  openDesc: boolean = false;
  icon: boolean = false;
  cardClicked: number;
  image: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(resp => {
      this.products = resp.products;
    });
  }

  openDescription(product: IProduct) {
    product.open = !product.open;
    // this.openDesc = !this.openDesc;
    // this.openDesc ? this.icon = true : this.icon = false;
    // this.cardClicked = index;
  }

}
