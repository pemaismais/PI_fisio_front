import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  description = "Métodos fisioterapêuticos para alívio e prevenção de dores em professores do Ensino Fundamental"
  onStart() {
    this.router.navigate(['/login']);
  }
}
