import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../../common/logo/logo.component';
import { AvatarComponent } from "../../../common/avatar/avatar.component";

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [RouterOutlet, LogoComponent, AvatarComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

}
