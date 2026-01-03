import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading = true;
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }

    this.cartService.getCart(this.auth.getUser()?.afm).subscribe();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.product = res.data;
        }
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }


  get currentQty(): number {
    if (!this.product || !this.cartItems) return 0;

    const occurrences = this.cartItems.filter(item => item.id === this.product.id).length;
    return occurrences;
  }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe(() => {
      this.refreshCart();
      this.cartService.increaseCount();   
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product).subscribe(() => {
      this.refreshCart();
      this.cartService.decreaseCount();
    });
  }

  private refreshCart() {
    const user = this.auth.getUser();
    if (user) {
      this.cartService.getCart(user.afm).subscribe();
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}