import { Component, ElementRef, inject, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AvatarComponent } from "../../common/avatar/avatar.component";
import { LogoComponent } from "../../common/logo/logo.component";
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MdbCollapseModule, RouterLink, AvatarComponent, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent  {
  constructor() {}
  authService = inject(KeycloakService);
  isLogged = false;

   ngOnInit() {
    if(this.authService.isLoggedIn())
      this.isLogged =  true;    
  }

  scrollToSection(section: HTMLElement){
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}
