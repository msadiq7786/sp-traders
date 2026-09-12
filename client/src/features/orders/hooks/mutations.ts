import {
  createOrder,
  deleteOrder,
  updateAdminOrder,
  updateOrder,
} from "@/lib/api/orders.api";

import { CreateOrder, Order, OrderStatus } from "../types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/axios-error";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: CreateOrder) => createOrder(order),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success("Order created successfully");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { order: Partial<Order>; orderId: string }) =>
      updateOrder(params),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success("Order updated successfully");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteOrder = (orderId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteOrder(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["order", orderId],
      });

      toast.success("Order deleted successfully");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useAdminUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { status: OrderStatus; orderId: string }) =>
      updateAdminOrder(params),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success("Order updated successfully");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
