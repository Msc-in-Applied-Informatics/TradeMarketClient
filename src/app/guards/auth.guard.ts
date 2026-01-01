import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const user = localStorage.getItem('currentUser');

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};


