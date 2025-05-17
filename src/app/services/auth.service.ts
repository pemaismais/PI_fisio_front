import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, from, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthDTO } from '../models/auth-dto';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';
import { KeycloakService } from './keycloak.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.BACKEND_URL}/api/auth`;
  private readonly access_token = 'access_token';
  private readonly refresh_token = 'refresh_token';
  private isKeycloakInitialized = false;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  /**
   * Inicializa o Keycloak, caso ainda não tenha sido inicializado
   */
  public async initKeycloak(): Promise<boolean> {
    if (this.isKeycloakInitialized) {
      return true;
    }

    try {
      console.log('Iniciando Keycloak...');
      this.isKeycloakInitialized = await this.keycloakService.init();

      // Se já está logado no Keycloak, salva o token no localStorage
      if (this.isKeycloakInitialized && this.keycloakService.isLoggedIn()) {
        console.log('Usuário já autenticado no Keycloak');
        const token = await this.keycloakService.getToken();
        localStorage.setItem(this.access_token, token);

        // Redireciona para a home se estiver na tela de login
        const currentPath = window.location.pathname;
        if (currentPath === '/login') {
          this.router.navigate(['/home']);
        }
      }

      return this.isKeycloakInitialized;
    } catch (error) {
      console.error('Erro ao inicializar o Keycloak', error);
      return false;
    }
  }

  /**
   * Retorna o access token do localStorage (ou tenta pegar do Keycloak)
   */
  public getAccessToken(): string | null {
    if (this.isKeycloakInitialized && this.keycloakService.isLoggedIn()) {
      this.keycloakService.getToken()
        .then(token => {
          localStorage.setItem(this.access_token, token);
          return token;
        })
        .catch(() => {
          return localStorage.getItem(this.access_token);
        });
    }

    return localStorage.getItem(this.access_token);
  }

  /**
   * Retorna o refresh token do localStorage
   */
  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refresh_token);
  }

  /**
   * Retorna um objeto AuthDTO com os tokens atuais
   */
  public getAuth(): AuthDTO {
    return new AuthDTO(
      this.getAccessToken() || '',
      this.getRefreshToken() || ''
    );
  }

  /**
   * Salva os tokens no localStorage
   */
  public setAuthToken(authDTO: AuthDTO): void {
    localStorage.setItem(this.access_token, authDTO.accessToken);
    localStorage.setItem(this.refresh_token, authDTO.refreshToken);
  }

  /**
   * Verifica se o usuário está logado
   */
  public isLoggedIn(): boolean {
    if (this.isKeycloakInitialized) {
      return this.keycloakService.isLoggedIn();
    }

    return this.getAccessToken() != null;
  }

  /**
   * Redireciona para o login do Keycloak
   */
  loginWithKeycloak(redirectUrl?: string): void {
    console.log('Iniciando login com Keycloak via AuthService');
    const cleanRedirectUrl = redirectUrl || `${window.location.origin}/login`;

    this.keycloakService.login(cleanRedirectUrl)
      .catch(error => {
        console.error('Erro ao fazer login com Keycloak:', error);
      });
  }

  /**
   * Método unificado de login
   * - Usa Keycloak se estiver ativo
   * - Caso contrário, tenta login com token do Google
   */
  login(idToken?: string): Observable<boolean> {
    if (this.isKeycloakInitialized) {
      console.log('Usando fluxo de login do Keycloak');
      this.loginWithKeycloak();
      return of(true);
    } else if (idToken) {
      console.log('Usando fluxo de login legado com Google');
      return this.loginWithGoogle(idToken).pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
    }

    return of(false);
  }

  /**
   * Login antigo usando token do Google
   */
  private loginWithGoogle(idToken: string): Observable<AuthDTO> {
    console.log('ID token from Google: ', idToken);
    const payload = { idToken };

    return this.http.post<AuthDTO>(`${this.apiUrl}/login`, payload, { responseType: 'json' })
      .pipe(
        tap((authDTO: AuthDTO) => {
          this.setAuthToken(authDTO);
        })
      );
  }

  /**
   * Atualiza o token atual usando o refresh token
   * Tenta via Keycloak primeiro, depois pelo fluxo legado
   */
  refresh(refreshToken: string): Observable<AuthDTO> {
    if (this.isKeycloakInitialized) {
      console.log('Tentando atualizar token via Keycloak');
      return from(this.keycloakService.updateToken(30)).pipe(
        switchMap(refreshed => {
          if (refreshed) {
            return from(this.keycloakService.getToken()).pipe(
              switchMap(token => {
                const authDTO = new AuthDTO(token, '');
                this.setAuthToken(authDTO);
                return of(authDTO);
              })
            );
          } else {
            console.log('Token Keycloak ainda válido, usando existente');
            return from(this.keycloakService.getToken()).pipe(
              switchMap(token => {
                const authDTO = new AuthDTO(token, '');
                return of(authDTO);
              })
            );
          }
        }),
        catchError(error => {
          console.error('Erro ao atualizar token via Keycloak', error);
          return this._refreshLegacy(refreshToken);
        })
      );
    } else {
      console.log('Usando fluxo legado para refresh token');
      return this._refreshLegacy(refreshToken);
    }
  }

  /**
   * Fluxo alternativo (legado) de refresh token
   */
  private _refreshLegacy(refreshToken: string): Observable<AuthDTO> {
    const payload = { refreshToken };
    return this.http.post<AuthDTO>(`${this.apiUrl}/refreshToken`, payload, { responseType: 'json' });
  }

  /**
   * Faz logout e limpa o localStorage
   */
  logout(): void {
    if (this.isKeycloakInitialized) {
      console.log('Logout via Keycloak');
      this.keycloakService.logout(`${window.location.origin}/login`);
    } else {
      console.log('Logout método legado');
      localStorage.removeItem(this.access_token);
      localStorage.removeItem(this.refresh_token);
      this.router.navigate(['/login']);
    }
  }

  /**
   * Decodifica um token JWT e retorna as informações
   */
  jwtDecode(token: string): any {
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Erro ao decodificar token JWT', error);
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Retorna as informações do usuário (perfil)
   */
  public async getUserInfo(): Promise<any> {
    if (this.isKeycloakInitialized && this.keycloakService.isLoggedIn()) {
      try {
        console.log('Obtendo informações do usuário via Keycloak');
        return await this.keycloakService.loadUserProfile();
      } catch (error) {
        console.error('Erro ao carregar perfil do usuário do Keycloak', error);
      }
    }

    // Método legado usando token JWT
    console.log('Obtendo informações do usuário pelo token JWT');
    const token = this.getAccessToken();
    if (token) {
      return this.jwtDecode(token);
    }

    return null;
  }

  /**
   * Obtém a URL da foto de perfil do usuário
   */
  public getProfilePicture(): string {
    let user = this.jwtDecode(this.getAccessToken() || '') as { picture?: string };
    return user?.picture || "";
  }

  /**
   * Verifica se o usuário tem determinada role
   */
  hasPermission(role: string): boolean {
    if (this.isKeycloakInitialized && this.keycloakService.isLoggedIn()) {
      return this.keycloakService.isUserInRole(role);
    }

    // Verificação por JWT (modo legado)
    let user = this.jwtDecode(this.getAccessToken() || '') as User;
    return user?.role === role;
  }
}
