import { Component, inject, Inject } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MdbRippleModule, MdbFormsModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  authService = inject(AuthService);
}
