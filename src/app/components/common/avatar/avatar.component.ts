import { Component, inject, Inject } from '@angular/core';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MdbDropdownModule, RouterLink],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  userAvatar: String = '';
  authService = inject(KeycloakService);
  constructor(){
    //this.userAvatar = this.authService.getProfilePicture();
    console.log('User avatar: ', this.userAvatar);
  }

  isAdmin = false;

   ngOnInit() {
    this.isAdmin = this.authService.isUserInRole('ADMIN');
  }
}
