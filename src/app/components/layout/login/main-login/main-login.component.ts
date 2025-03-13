import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../../logo/logo.component';

@Component({
  selector: 'app-main-login',
  standalone: true,
  imports: [RouterOutlet, LogoComponent],
  templateUrl: './main-login.component.html',
  styleUrl: './main-login.component.scss'
})
export class MainLoginComponent {

}
