import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/citizen/product-list/product-list.component';
import { authGuard } from './guards/auth.guard';
import { InventoryComponent } from './components/store/inventory/inventory.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
{ 
    path: 'products', 
    component: ProductListComponent, 
    canActivate: [authGuard],
    data: { role: 'CITIZEN' }  
  },
  {
    path: 'store-inventory',
    component: InventoryComponent,
    canActivate: [authGuard],
    data: { role: 'SHOP' }  
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
