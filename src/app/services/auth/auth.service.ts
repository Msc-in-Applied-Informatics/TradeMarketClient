import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Η διεύθυνση του Spring Boot API σου
  private baseUrl = 'http://localhost:8080';
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
  private userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  register(userData: any, type: string): Observable<any> {
    const endpoint = type === 'CITIZEN' ? '/register/citizen' : '/register/shop';
    return this.http.post(`${this.baseUrl}${endpoint}`, userData);
  }


  login(credentials: any): Observable<any> {    
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  setUser(user: any) {    
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
    this.loggedIn.next(true);
  }

  getUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {    
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false)
    this.userSubject.next(null);
    return this.http.post(`${this.baseUrl}/logout`, {});
  }
}