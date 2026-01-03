import { Component, OnInit } from '@angular/core'; // Προσθήκη OnInit
import { Product } from 'src/app/models/models';
import { CartService } from 'src/app/services/cart/cart.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; 
  allProductsForFilter: Product[] = []; 
  isLoading = false;

  constructor(
    private productService: ProductService, 
    private notify: NotificationService, 
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadInitialProducts();
  }

  loadInitialProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {        
        this.products = response.data.filter((p: any) => p.active === true);
        this.allProductsForFilter = [...this.products];
      },
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + (err.error?.message || 'κατά τη φόρτωση των προϊόντων')); 
      } 
    });
  }

  onFilterChange(filters: any) {
    this.isLoading = true
    this.productService.getFilteredProducts(filters).subscribe({
      next: (response) => {
        this.products = response.data.filter((p: any) => p.active === true);
        setTimeout(() => {          
          this.isLoading = false;
        }, 300);
      },
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + (err.error?.message || 'κατά την αναζήτηση των προϊόντων')); 
      } 
    });
  }

  addToCart(p: Product) {
    this.cartService.addToCart(p).subscribe({
      next: (response) => {
        this.notify.showSuccess('Το προϊόν προστέθηκε');
        this.cartService.increaseCount();
      },
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + (err.error?.message || 'κατά τη προσθήκη στο καλάθι')); 
      }
    });
  }
}