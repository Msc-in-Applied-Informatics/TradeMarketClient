import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJson = localStorage.getItem('currentUser');

  if (userJson) {
    const user = JSON.parse(userJson); 
    const expectedRole = route.data['role']; 

    
    if (expectedRole && user.role !== expectedRole) {
      if (user.role === 'CITIZEN') {
        router.navigate(['/products']);
      } else {
        router.navigate(['/login']);
      }
      return false;
    }

    return true;
  }

 
  router.navigate(['/login']);
  return false;
};