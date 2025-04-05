import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  private apiUrl = 'https://www.balldontlie.io/api/v1/players';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?per_page=10`);
  }
}
