import { User } from './user.types';

export interface Product {
  id: number;
  type: string;
  name: string;
  status: string;
  stock: number;
  size: string;
  price: number;
  diameter: number;
  tinggi: number;
  userId: number;
  images: { url: string }[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user: User;
}

export interface IFormProduct {
  type: string;
  name: string;
  status: string;
  size: string;
  stock: string;
  price: string;
  diameter: string;
  tinggi: string;
  userId?: number;
  images: File[];
}

export interface IFormEditProduct {
  type: string;
  name: string;
  status: string;
  size: string;
  stock: string;
  price: string;
  diameter: string;
  tinggi: string;
  userId?: number;
  images: File[];
  existingImages: { id: number; url: string }[];
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IProduct {
  type: string;
  name: string;
  status: string;
  stock: number;
  size: string;
  price: number;
  userId?: number;
  diameter: number;
  tinggi: number;
  images: { id: number; url: string }[];
}
