import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Product } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080';

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  
  constructor(private http: HttpClient, private auth: AuthService) { }


  updateCount(count: number) {
    this.cartCountSubject.next(count);
  }

  checkout(afm: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/checkout`, {afm: afm}, { withCredentials: true });
  }

getCart(afm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/my-cart/${afm}`).pipe(
      tap((res: any) => {
        if (res && res.data && res.data.products) {
          const count = res.data.products.length;
          this.updateCount(count); 
        } else {
          this.clearCartState();
        }
      })
    );
  }

  addToCart(product: Product):  Observable<any> {
    console.log(this.auth.getUser());
    console.log(product.id);
    const params = {
      productId: product.id,
      afm: this.auth.getUser()?.afm
    }
    return this.http.post(`${this.apiUrl}/cart/add`, params, { withCredentials: true });
  }

  
  removeFromCart(product: Product): Observable<any> {
    this.decreaseCount();
    const params = {
      productId: product.id,
      afm: this.auth.getUser()?.afm
    }
    return this.http.post(`${this.apiUrl}/cart/remove`, params, { withCredentials: true });
  }

  increaseCount() {
    this.updateCount(this.cartCountSubject.value + 1);
  }

  decreaseCount() {
    this.updateCount(this.cartCountSubject.value - 1);
  }

  clearCartState() {
    this.updateCount(0); 
  }
}
