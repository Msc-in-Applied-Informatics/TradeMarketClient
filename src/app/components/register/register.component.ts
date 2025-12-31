import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  userType: string = 'CITIZEN';

  userData: any = {
    afm: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    shopName: ''
  };

  constructor(private authService: AuthService, private router: Router, private notify: NotificationService) {}

  register() {  
    let finalData: any = {
      afm: this.userData.afm,
      email: this.userData.email,
      password: this.userData.password,
      role: this.userType 
    };

    if (this.userType === 'CITIZEN') {
      finalData.name = this.userData.name;
      finalData.surname = this.userData.surname;
    } else if (this.userType === 'SHOP') {
      finalData.shopName = this.userData.shopName;
    }
    this.authService.register(this.userData, this.userType).subscribe({
      next: (res) => {
        this.notify.showSuccess('Η εγγραφή ολοκληρώθηκε με επιτυχία!'); 
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.notify.showError('Σφάλμα: ' + (err.error.message || 'Αποτυχία εγγραφής')); 
      }
    });
  }
}
