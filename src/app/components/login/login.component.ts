import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  hide = true; 

  constructor(private authService: AuthService, private router: Router, private notify: NotificationService, private cartService: CartService) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
          this.authService.setUser(response.data); 
          this.notify.showSuccess('Σύνδεση επιτυχής!'); 
        
        if (response.role === 'SHOP') {
          this.router.navigate(['/store-inventory']);
        } else {
          this.cartService.getCart(this.authService.getUser()?.afm).subscribe({
            next: () => {
              this.router.navigate(['/products']);
            }
          });
        }
      },
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + 'Λάθος ΑΦΜ ή Κωδικός');
      }
    });
  }
}
