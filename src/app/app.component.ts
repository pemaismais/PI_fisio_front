import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PI_fisio_front';

  // testando environments variables!
  constructor(s: AuthService){
    console.log(environment.BACKEND_URL)
    console.log (s.jwtDecode(s.getAccessToken() || '')) 

  }
  // -- 
}
