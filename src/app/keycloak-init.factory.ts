import { KeycloakService } from "keycloak-angular";
import { environment } from "../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
    console.log('Keycloak url: ' + environment.keycloak.url);
    const keycloakConfig = {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId 
    };
    return () =>
        keycloak.init({
            config: {
                url: keycloakConfig.url,
                realm: keycloakConfig.realm,
                clientId: keycloakConfig.clientId,
            },
            initOptions: {
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                enableLogging: true,
            }
        });
}