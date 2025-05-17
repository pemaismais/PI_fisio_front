import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

// Interceptor HTTP que adiciona o token de autenticação nas requisições
export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ignora requisições que vão direto pro Keycloak (evita loop ou erro de CORS)
  if (request.url.includes('/auth/realms/')) {
    return next(request);
  }

  const token = authService.getAccessToken();

  // Se tiver token e não for a rota de login ou refresh, adiciona o Authorization no header
  if (
    token &&
    !request.url.includes('/auth/login') &&
    !request.url.includes('/auth/refreshToken')
  ) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  // Continua com a requisição, mas tratando possíveis erros (401, 403 etc)
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // 401 = não autorizado, geralmente token expirado

          const refresh_token = authService.getRefreshToken() || '';

          if (refresh_token) {
            // Tenta renovar o token usando o refresh_token
            return authService.refresh(refresh_token).pipe(
              switchMap(authDTO => {
                // Se deu certo, refaz a requisição original com o novo token
                const updatedRequest = request.clone({
                  setHeaders: { Authorization: 'Bearer ' + authDTO.accessToken },
                });
                return next(updatedRequest);
              }),
              catchError(refreshError => {
                // Deu erro ao tentar renovar -> desloga e manda pro login
                console.error('Erro ao renovar token:', refreshError);
                authService.logout();
                router.navigate(['/login']);
                return throwError(() => refreshError);
              })
            );
          } else {
            // Se não tiver refresh_token, redireciona direto pro login
            authService.logout();
            router.navigate(['/login']);
          }

        } else if (err.status === 403) {
          // 403 = usuário não tem permissão, redireciona também
          console.error('Acesso proibido (403)');
          router.navigate(['/login']);

        } else {
          // Outros erros HTTP
          console.error('HTTP error:', err);
        }
      } else {
        // Erro não relacionado à resposta HTTP
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
