import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRegistryComponent } from './product-registry/product-registry.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ProductComponent,
    DashboardComponent,
    ProductListComponent,
    ProductRegistryComponent,
    ProductCardComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
