import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MdbCollapseModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {}

  scrollToSection(section: HTMLElement){
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}
