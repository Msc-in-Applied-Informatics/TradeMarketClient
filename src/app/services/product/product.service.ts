import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getFilteredProducts(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.brand) {
      params = params.set('brand', filters.brand);
    }
    if (filters.minPrice != null) {
      params = params.set('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice != null) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/getProducts`,{withCredentials: true});
  }

  getProductsByShop(shopAfm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/getProducts/${shopAfm}`);
  }
  
}
