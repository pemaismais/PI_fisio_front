import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import Keycloak, { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthDTO } from '../models/auth-dto';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloak: KeycloakInstance;
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private apiUrl = `${environment.BACKEND_URL}/api/auth`;

  // Usado pra não chamar init do Keycloak mais de uma vez
  private initializing: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    // Instancia do Keycloak com base nas configs do environment
    this.keycloak = Keycloak({
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENT_ID,
    });

    // Quando o token expira, tenta atualizar automaticamente
    this.keycloak.onTokenExpired = () => {
      console.log('Token expirado. Tentando atualizar...');
      this.updateToken();
    };
  }

  // Chama a inicialização do Keycloak (geralmente na inicialização do app)
  init(): Promise<boolean> {
    if (this.initializing) {
      console.log('Keycloak já está sendo inicializado');
      return Promise.resolve(this.keycloak.authenticated || false);
    }

    this.initializing = true;

    return this.keycloak
      .init({
        onLoad: 'check-sso', // tenta ver se o usuário já está logado via SSO
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        enableLogging: true, // deixar ativado no dev pra ajudar debug
      })
      .then((authenticated) => {
        console.log('Keycloak inicializado. Autenticado:', authenticated);
        this.initializing = false;

        if (authenticated) {
          console.log('Usuário autenticado com Keycloak');
          this.isAuthenticated$.next(true);
          // Armazena os tokens localmente pra reutilizar
          localStorage.setItem('access_token', this.keycloak.token || '');
          localStorage.setItem('refresh_token', this.keycloak.refreshToken || '');
        } else {
          console.log('Usuário não autenticado com Keycloak');
          this.isAuthenticated$.next(false);
        }

        return authenticated;
      })
      .catch((error) => {
        console.error('Erro ao iniciar Keycloak', error);
        this.initializing = false;
        this.isAuthenticated$.next(false);
        return false;
      });
  }

  // Redireciona pro login do Keycloak, já com redirect URI e hint do Google
  login(redirectUri?: string): Promise<void> {
    const cleanRedirectUri = redirectUri || window.location.origin + '/login';

    console.log('Iniciando login com Keycloak. Redirect URI:', cleanRedirectUri);

    return this.keycloak.login({
      redirectUri: cleanRedirectUri,
      idpHint: 'google', // força usar Google direto como provedor
      prompt: 'login' // força mostrar a tela de login sempre
    });
  }

  // Faz logout limpando tokens e redirecionando pro Keycloak
  logout(redirectUri?: string): Promise<void> {
    console.log('Fazendo logout do Keycloak');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated$.next(false);

    return this.keycloak.logout({
      redirectUri: redirectUri || window.location.origin + '/login',
    });
  }

  // Só verifica se o usuário está logado (não atualiza token nem nada)
  isLoggedIn(): boolean {
    return this.keycloak.authenticated || false;
  }

  // Retorna observable da autenticação (útil pra quem quiser se inscrever)
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  // Retorna o token atual (se tiver), usado pra chamadas com auth
  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.keycloak.token) {
        resolve(this.keycloak.token);
      } else {
        reject('Sem token de acesso disponível');
      }
    });
  }

  // Atualiza o token se estiver perto de expirar (por padrão 30s)
  public updateToken(minValidity: number = 30): Promise<boolean> {
    return this.keycloak
      .updateToken(minValidity)
      .then((refreshed: boolean) => {
        if (refreshed) {
          console.log('Token atualizado com sucesso');
          localStorage.setItem('access_token', this.keycloak.token || '');
          localStorage.setItem('refresh_token', this.keycloak.refreshToken || '');
        } else {
          console.log('Token ainda válido, não foi necessário atualizar');
        }
        return refreshed;
      })
      .catch((err: any) => {
        console.error('Erro ao atualizar token', err);
        // Deu ruim pra atualizar, então desloga o usuário
        this.isAuthenticated$.next(false);
        throw err;
      });
  }

  // Verifica se o usuário atual tem uma role específica (útil pra guards)
  isUserInRole(role: string): boolean {
    return this.keycloak.hasRealmRole(role);
  }

  // Retorna informações básicas do perfil (nome, email, etc.)
  loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }
}
