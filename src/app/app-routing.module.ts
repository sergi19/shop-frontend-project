import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.guard';

const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: '',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
