import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/getProducts`,{withCredentials: true});
  }

  getProductsByShop(shopAfm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/getProducts/${shopAfm}`);
  }
  
}
