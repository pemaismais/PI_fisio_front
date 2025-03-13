import { Component, ElementRef, inject, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AvatarComponent } from "../../avatar/avatar.component";
import { AuthService } from '../../../services/auth.service';
import { LogoComponent } from "../../logo/logo.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MdbCollapseModule, RouterLink, AvatarComponent, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}
  authService = inject(AuthService);

  scrollToSection(section: HTMLElement){
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}
