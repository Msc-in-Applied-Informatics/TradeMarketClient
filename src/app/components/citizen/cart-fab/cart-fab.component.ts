import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cart-fab',
  templateUrl: './cart-fab.component.html',
  styleUrls: ['./cart-fab.component.less']
})
export class CartFabComponent {
  cartCount: number = 0;
  constructor(private cartService: CartService, private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.getUser()?.role === "CITIZEN") {
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      });
    
      if (this.auth.getUser()?.afm) {
        this.cartService.getCart(this.auth.getUser()?.afm).subscribe();
      }
    }
  }

  openCartDialog() {
    this.dialog.open(CartDialogComponent, {
      width: '800px',
      panelClass: 'cart-dialog-container'
    });
  }

}
