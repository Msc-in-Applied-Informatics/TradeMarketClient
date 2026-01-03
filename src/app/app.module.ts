import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/citizen/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartDialogComponent } from './components/citizen/cart-dialog/cart-dialog.component';
import { CartFabComponent } from './components/citizen/cart-fab/cart-fab.component';
import { PaymentDialogComponent } from './components/citizen/payment-dialog/payment-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFilterComponent } from './components/citizen/product-filter/product-filter.component';
import { InventoryComponent } from './components/store/inventory/inventory.component';
import { ProductDialogComponent } from './components/store/product-dialog/product-dialog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductListComponent,
    CartDialogComponent,
    CartFabComponent,
    PaymentDialogComponent,
    ProductFilterComponent,
    InventoryComponent,
    ProductDialogComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
