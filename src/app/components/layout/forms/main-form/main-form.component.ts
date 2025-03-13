import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from '../../../logo/logo.component';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [RouterOutlet ,LogoComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

}
