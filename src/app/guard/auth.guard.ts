import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
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
}