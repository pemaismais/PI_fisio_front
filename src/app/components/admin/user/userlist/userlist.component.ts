import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { JointIntensity, User } from '../../../../models/user';
import { Intensity } from '../../../../models/exercise';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [ MdbModalModule, NgClass],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent {
  @Input('users') users: User[] = []
  @Output('changeRole') changeRoleEvent = new EventEmitter<User>();
  constructor(private authService: AuthService){}
  changeRole(user: User){
      this.changeRoleEvent.emit(user);
    }
    
    isMe(email: string): boolean {
      const decoded = this.authService.jwtDecode(this.authService.getAccessToken() || '');
      return typeof decoded === 'object' && 'username' in decoded ? decoded.username === email : false;
    }

  getBadgeClass(jointIntensity: JointIntensity): string {
    switch (jointIntensity.intensity) {
      case Intensity.High:
        return 'badge-danger';
      case Intensity.Medium:
        return 'badge-warning';
      case Intensity.Low:
        return 'badge-primary';
      default:
        return '';
    }
}
}
