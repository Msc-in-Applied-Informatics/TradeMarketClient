import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  userType: string = 'CITIZEN';

  userData: any = {
    afm: '',
    password: '',
    name: '',
    surname: '',
    shopName: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

register() {
  const dataToSend = { ...this.userData };

  this.authService.register(dataToSend, this.userType).subscribe({
    next: (response) => {
      console.log('Εγγραφή οκ!', response);
      alert('Η εγγραφή ολοκληρώθηκε! Τώρα μπορείτε να συνδεθείτε.');
      this.router.navigate(['/login']); 
    },
    error: (err) => {
      console.error('Σφάλμα εγγραφής', err);
      alert('Κάτι πήγε λάθος: ' + (err.error.message || 'Προσπαθήστε ξανά'));
    }
  });
}
}
