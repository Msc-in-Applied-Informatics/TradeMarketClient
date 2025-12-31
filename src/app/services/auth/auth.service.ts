import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Η διεύθυνση του Spring Boot API σου
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  register(userData: any, type: string): Observable<any> {
    const endpoint = type === 'CITIZEN' ? '/register/citizen' : '/register/shop';
    return this.http.post(`${this.baseUrl}${endpoint}`, userData);
  }


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}