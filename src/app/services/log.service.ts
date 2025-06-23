import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LogPage } from '../models/log-page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private http = inject(HttpClient);
  private api = `${environment.BACKEND_URL}/api/audit`;

  constructor() { }
  findAll(page = 0, size = 10): Observable<LogPage> {
    return this.http.get<LogPage>(`${this.api}/all`, { params: { page, size } });
  }
}
