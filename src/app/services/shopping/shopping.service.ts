import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getHistory(afm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/citizen/${afm}`, { withCredentials: true });
  }

  getSales(afm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/shop/sales/${afm}`, { withCredentials: true });
  }
}
