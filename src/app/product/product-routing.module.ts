import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../product/dashboard/dashboard.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { ProductRegistryComponent } from '../product/product-registry/product-registry.component';
import { ProductComponent } from './product.component';
import { AuthGuard } from '../core/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: ProductComponent,
    children : [
      { path: '', component: DashboardComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-registry', component: ProductRegistryComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
