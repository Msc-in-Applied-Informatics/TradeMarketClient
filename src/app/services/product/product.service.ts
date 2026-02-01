import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
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

    if (filters.shopName != null) {
      params = params.set('shopName', filters.shopName);
    }
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/getProducts`,{withCredentials: true});
  }

  getProductsByShop(shopAfm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/getProducts/${shopAfm}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/getProduct/${id}`);
  }

  deleteProduct(product: Product, shopAfm: string): Observable<any> {
    const params = {
      "id": product.id,
      "type": product.type,
      "brand": product.brand,
      "description": product.description,
      "price": product.price,
      "stock": product.stock,
      "shopAfm": shopAfm
    }
    return this.http.delete(`${this.apiUrl}/product/remove`, { body: params });
  }

  revertProduct(product: Product, shopAfm: string): Observable<any> {
    const params = {
      "id": product.id,
      "type": product.type,
      "brand": product.brand,
      "description": product.description,
      "price": product.price,
      "stock": product.stock,
      "shopAfm": shopAfm
    }
    return this.http.post(`${this.apiUrl}/product/revert`,  params);
  }


  saveProduct(product: Product, action: string): Observable<any> {
    const data = {
      "id": product.id,
      "type": product.type,
      "brand": product.brand,
      "description": product.description,
      "price": product.price,
      "stock": product.stock,
      "shopAfm": product.shopAfm
    }
    if (action === "add")
      return this.addProduct(data);
    else
      return this.updateProduct(data);;
  }

  addProduct(product: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/product/addProduct`, product);
  }

  updateProduct(product: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/product/update`, product);
  }
  
  
}
