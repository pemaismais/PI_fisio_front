import { Component, inject, Inject } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MdbRippleModule, MdbFormsModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  authService = inject(KeycloakService);

  isAdmin = false;

ngOnInit() {
  this.isAdmin =  this.authService.isUserInRole('ADMIN');
}
}
