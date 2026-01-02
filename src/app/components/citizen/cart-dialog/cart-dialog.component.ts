import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.less']
})
export class CartDialogComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  isLoading: boolean = true;

  constructor(
    private cartService: CartService,
    private dialogRef: MatDialogRef<CartDialogComponent>,
    private notify: NotificationService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const user = this.auth.getUser();
    if (user && user.afm) {
      this.cartService.getCart(user.afm).subscribe({
        next: (res: any) => {
          const rawProducts = res.data.products;
          this.totalPrice = res.data.totalPrice;
          
          this.cartItems = this.groupProducts(rawProducts);
          
          this.isLoading = false;
          this.cartService.updateCount(rawProducts.length);
        }
      });
    }
  }

  groupProducts(products: any[]): any[] {
    const grouped = new Map<number, any>();

    products.forEach(p => {
      if (grouped.has(p.id)) {
        grouped.get(p.id).quantity += 1;
      } else {
        grouped.set(p.id, { ...p, quantity: 1 });
      }
    });

    return Array.from(grouped.values());
  }

  openPayment() {
    this.dialogRef.close();
    this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      data: { totalPrice: this.totalPrice },
      disableClose: true
    });
  }

  removeFromCart(p: Product) {
    this.cartService.removeFromCart(p).subscribe({
      next: (res: any) => {
        this.loadCart(); 
        this.notify.showSuccess('Το προϊόν αφαιρέθηκε');
      },
      error: (err) => {
        this.notify.showError('Σφάλμα κατά την αφαίρεση.');
      }
    });
  }

   addToCart(p: Product) {
    this.cartService.addToCart(p).subscribe({
      next: (response) => {
        this.loadCart(); 
        this.notify.showSuccess('Το προϊόν προστέθηκε');
        this.cartService.increaseCount();
      },
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + (err.error.message || 'κατά τη προσθήκη των προϊόντων στο καλάθι')); 
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}