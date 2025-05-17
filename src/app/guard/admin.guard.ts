import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  // Verifica se o serviço Keycloak está inicializado
  try {
    // Se não estiver inicializado, tenta inicializar
    if (!authService['isKeycloakInitialized']) {
      await authService.initKeycloak();
    }
  } catch (error) {
    console.error('Erro ao inicializar Keycloak no guard', error);
  }
  
  if (authService.isLoggedIn()) {
    if (authService.hasPermission('ADMIN')) {
      return true;  // Permite acesso
    }
  }
  
  // Redireciona para o login se não tiver permissão
  router.navigate(['/login']); 
  return false; // Nega acesso
};