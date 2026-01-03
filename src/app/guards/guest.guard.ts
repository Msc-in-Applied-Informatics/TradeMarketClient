import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('currentUser');

  if (userJson) {
    const user = JSON.parse(userJson);

    if (user.role === 'SHOP') {
      router.navigate(['/store-inventory']);
    } else {
      router.navigate(['/products']);
    }

    return false;
  }
  return true;
};