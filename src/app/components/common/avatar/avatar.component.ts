import { Component, inject, Inject } from '@angular/core';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MdbDropdownModule, RouterLink],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  userAvatar: String;
  authService = inject(AuthService);
  constructor(){
    this.userAvatar = this.authService.getProfilePicture();
    console.log('User avatar: ', this.userAvatar);
  }

}
