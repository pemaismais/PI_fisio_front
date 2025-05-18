import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';


export const AdminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(KeycloakService);

  try {
    if (!authService.isLoggedIn()) {
      await authService.init();
    }
  } catch (error) {
    console.error('Erro ao inicializar Keycloak no guard', error);
  }
    if (authService.isUserInRole('ADMIN')) {
      return true; 
    }
  

  router.navigate(['/login']);
  return false;
};