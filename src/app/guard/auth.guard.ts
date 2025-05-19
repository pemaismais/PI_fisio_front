import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      console.log('Not authenticated')
      return this.router.parseUrl('/home');
    }
    console.log('Authenticated')
    return true;
  }

  // constructor(protected override router: Router, protected override keycloakAngular: KeycloakService) {
  //   super(router, keycloakAngular);
  // }

  // public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
  //   const requiredRoles = route.data['roles'] as string[] | undefined;

  //   this.authenticated = await this.keycloakAngular.isLoggedIn();

  //   if (!this.authenticated) {
  //     await this.keycloakAngular.login({ redirectUri: window.location.origin + state.url });
  //     return false;
  //   }

  //   this.roles = this.keycloakAngular.getUserRoles();

  //   if (!requiredRoles || requiredRoles.length === 0) {
  //     return true;
  //   }

  //   const hasRole = requiredRoles.some(role => this.roles.includes(role));
  //   if (!hasRole) {
  //     return this.router.parseUrl('/unauthorized'); // ou outra rota de acesso negado
  //   }

  //   return true;
  // }
}