import { KeycloakService } from "keycloak-angular";
import { environment } from "../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
    
    return () =>
        keycloak.init({
            config: {
                url: environment.keycloak.url ?? 'http://localhost:7080',
                realm: environment.keycloak.realm ?? 'main_realm',
                clientId: environment.keycloak.clientId ?? 'led',
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                enableLogging: true,
            }
        });
}