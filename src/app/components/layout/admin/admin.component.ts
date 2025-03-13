import { Component, inject, Inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { AppComponent } from "../../../app.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AuthService } from '../../../services/auth.service';
import { AvatarComponent } from "../../common/avatar/avatar.component";
import { LogoComponent } from "../../common/logo/logo.component";
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MdbCollapseModule, RouterOutlet, FooterComponent, MdbDropdownModule, AvatarComponent, LogoComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  authService = inject(AuthService)
  profilePicture: string = "";

  ngOnInit(){
    this.profilePicture = this.authService.getProfilePicture();
    console.log(this.profilePicture)
  }

 logout(){
  this.authService.logout()
 }
}
