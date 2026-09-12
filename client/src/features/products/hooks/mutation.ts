import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct, UpdateProduct } from "../types";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/api/products.api";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/axios-error";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CreateProduct) => createProduct(product),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      product,
      productId,
    }: {
      product: UpdateProduct;
      productId: string;
    }) => updateProduct(product, productId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
