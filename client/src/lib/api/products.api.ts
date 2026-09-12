import { CreateProduct, Product } from "@/features/products/types";
import { api } from "../axios";

export const getProducts = async () => {
  const response = await api.get<{
    data: {
      products: Product[];
      totalProducts: number;
    };
  }>("/products");

  return response.data;
};

export const createProduct = async (product: CreateProduct) => {
  const response = await api.post("/admin/products", product);

  return response.data;
};

export const updateProduct = async (
  product: Partial<Product>,
  productId: string,
) => {
  const response = await api.put(`/admin/products/${productId}`, product);

  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await api.delete(`/admin/products/${productId}`);
  return response.data;
};
