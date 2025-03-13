import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ RouterOutlet, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
