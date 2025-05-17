import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PI_fisio_front';
  private keycloakInstance: any;

  constructor(private authService: AuthService) {
    console.log(environment.BACKEND_URL);
    
    try {
      console.log(this.authService.jwtDecode(this.authService.getAccessToken() || ''));
    } catch (e) {
      console.log('No token available or token invalid');
    }
    
    this.initKeycloak();
  }

  private initKeycloak(): void {
    this.keycloakInstance = new Keycloak({
      url: environment.KEYCLOAK_URL,
      realm: environment.KEYCLOAK_REALM,
      clientId: environment.KEYCLOAK_CLIENT_ID
    });

    this.keycloakInstance.init({
      onLoad: 'check-sso'
    })
    .then((authenticated: boolean) => {
      console.log('Keycloak initialized, authenticated:', authenticated);
      
      if (authenticated && this.keycloakInstance.token) {
        this.keycloakInstance.onTokenExpired = () => {
          this.keycloakInstance.updateToken(30);
        };
      }
    })
    .catch((error: any) => {
      console.error('Failed to initialize Keycloak:', error);
    });
  }
}
