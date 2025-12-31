import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginData = {
    afm: '',
    password: ''
  };

  hide = true; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
   this.authService.login(this.loginData).subscribe({
    next: (response) => {
      this.authService.setUser(response); 
      console.log('Σύνδεση επιτυχής!', response);
      
      if (response.role === 'SHOP') {
        this.router.navigate(['/shop-admin']);
      } else {
        this.router.navigate(['/products']);
      }
    },
    error: (err) => {
      alert('Λάθος ΑΦΜ ή Κωδικός');
    }
  });
  }
}
