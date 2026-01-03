import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/citizen/product-list/product-list.component';
import { InventoryComponent } from './components/store/inventory/inventory.component';
import { ProductDetailsComponent } from './components/citizen/product-details/product-details.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { HistoryComponent } from './components/citizen/history/history.component';
import { ShopSalesComponent } from './components/store/shop-sales/shop-sales.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  { 
    path: 'products', 
    component: ProductListComponent, 
    canActivate: [authGuard],
    data: { role: 'CITIZEN' }  
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
    data: { role: 'CITIZEN' } 
  },
  {
    path: 'store-inventory',
    component: InventoryComponent,
    canActivate: [authGuard],
    data: { role: 'SHOP' }  
  },
  { 
    path: 'history', 
    component: HistoryComponent, 
    canActivate: [authGuard],
    data: { role: 'CITIZEN' } 
  },
  { 
    path: 'sales', 
    component: ShopSalesComponent, 
    canActivate: [authGuard],
    data: { role: 'SHOP' } 
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
