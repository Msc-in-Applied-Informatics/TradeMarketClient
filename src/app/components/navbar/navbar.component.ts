import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
displayName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router, private notify: NotificationService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
    next: (user) => {
      this.userRole = user.role;
      this.displayName = (this.userRole === 'SHOP') ? user.name : `${user.name} ${user.surname}`;
    },
    error: (err) => {
      this.notify.showError('Σφάλμα: ' + (err.error.message || 'User not found')); 
    }
  });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}