import { Component } from '@angular/core';
import { Product } from 'src/app/models/models';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, private notify: NotificationService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => this.products = response.data,
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + (err.error.message || 'κατά τη φόρτωση των προϊόντων')); 
      } 
    });
  }
}
