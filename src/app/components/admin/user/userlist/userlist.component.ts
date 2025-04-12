import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { JointIntensity, User } from '../../../../models/user';
import { Intensity } from '../../../../models/exercise';
import { NgClass } from '@angular/common';

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

    changeRole(user: User){
      this.changeRoleEvent.emit(user);
    }
    
    isMe(userName: string): boolean {
      return localStorage.getItem('userName') === userName;
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
