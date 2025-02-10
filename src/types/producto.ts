export type Products = Product[];

export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  precio: string;
  isActive: boolean;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  seller: Seller;
  categories: Category[];
}

export interface Seller {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
