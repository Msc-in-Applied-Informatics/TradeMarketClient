import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHistory(afm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/citizen/${afm}`, { withCredentials: true });
  }

  getSales(afm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/shop/sales/${afm}`, { withCredentials: true });
  }
}
