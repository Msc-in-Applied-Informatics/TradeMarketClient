import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.less']
})
export class PaymentDialogComponent {
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { totalPrice: number },
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private cartService: CartService,
    private auth: AuthService,
    private notify: NotificationService
  ) {}

  confirmPayment() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isLoading = true;

    this.cartService.checkout(this.auth.getUser()?.afm).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.notify.showSuccess('Η πληρωμή ολοκληρώθηκε! Ευχαριστούμε.');
        this.cartService.updateCount(0);
        this.dialogRef.close(true);      
      },
      error: (err) => {
        this.isLoading = false;
       this.notify.showError('Σφάλμα στην πληρωμή. Ελέγξτε τα στοιχεία σας.');
      }
    });
  }
}