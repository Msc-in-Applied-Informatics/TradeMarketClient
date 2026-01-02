import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/citizen/product-list/product-list.component';
import { CartComponent } from './components/citizen/cart/cart.component';
import { DashboardComponent } from './components/store/dashboard/dashboard.component';
import { AddProductComponent } from './components/store/add-product/add-product.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { CartFabComponent } from './components/cart-fab/cart-fab.component';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductListComponent,
    CartComponent,
    DashboardComponent,
    AddProductComponent,
    CartDialogComponent,
    CartFabComponent,
    PaymentDialogComponent
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
