import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.less']
})
export class PaymentDialogComponent implements OnInit {
  isLoading = false;
  paymentForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { totalPrice: number },
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private cartService: CartService,
    private auth: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardHolder: ['ΓΕΩΡΓΙΟΣ ΠΑΠΑΔΟΠΟΥΛΟΣ', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['4242424242424242', [Validators.required, Validators.pattern('^[0-9]{16}$')]], // Μόνο 16 ψηφία
      expiry: ['12/30', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]], // MM/YY format
      cvv: ['123', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]] // 3 ή 4 ψηφία
    });
  }

  get f() { return this.paymentForm.controls; }
  confirmPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();  
      return;
    }

    this.isLoading = true;

    this.cartService.checkout(this.auth.getUser()?.afm).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.notify.showSuccess('Η πληρωμή ολοκληρώθηκε! Ευχαριστούμε.');
        this.cartService.updateCount(0);
        this.dialogRef.close(true);
        location.reload();
      },
      error: (err) => {
        this.isLoading = false;
        this.notify.showError('Σφάλμα στην πληρωμή. Ελέγξτε τα στοιχεία σας.');
      }
    });
  }
}