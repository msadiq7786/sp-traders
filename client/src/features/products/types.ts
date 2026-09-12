export interface Product {
  _id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateProduct = Omit<
  Product,
  "_id" | "isActive" | "createdAt" | "updatedAt"
>;

export type UpdateProduct = Partial<
  Omit<Product, "_id" | "isActive" | "createdAt" | "updatedAt">
>;
