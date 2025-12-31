export interface Product {
  id?: number;
  type: string;
  brand: string;
  description: string;
  price: number;
  stock: number;
  shopAfm: string;
}

export interface Citizen {
  afm: string;
  name: string;
  surname: string;
  email: string;
  role: 'CITIZEN';
}

export interface Shop {
  afm: string;
  name: string;
  owner: string;
  role: 'SHOP';
}

export interface Cart {
  id?: number;
  products: Product[];
  totalPrice: number;
}