import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogEntry } from '../../models/log-entry';
import { LogService } from '../../services/log.service';
import { LogPage } from '../../models/log-page';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})

export class LogComponent implements OnInit {
  private logService = inject(LogService);

  logs: LogEntry[] = [];
  totalPages = 0;
  totalElements = 0;
  page = 0;
  size = 10;

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    // this.logService.findAll(this.page, this.size).subscribe((data: LogPage) => {
    //   this.logs = data.logEntrys;
    //   this.totalPages = data.totalPages;
    //   this.totalElements = data.totalElements;
    // });
      this.logService.findAll(this.page, this.size).subscribe({
        next: data =>{
          this.logs = data.content;
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          console.log(data)
        },
        error: error => {
          console.error('Erro ao carregar os logs', error);
      }
    });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 0 && pageNumber < this.totalPages) {
      this.page = pageNumber;
      this.loadLogs();
    }
  }
}
