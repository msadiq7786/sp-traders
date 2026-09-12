import {
  getAdminDashboard,
  getAdminOrder,
  getAdminOrders,
  getOrderById,
  getOrders,
  IgetOrders,
  orderAnalystics,
} from "@/lib/api/orders.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useOrders = ({ page, limit, period, status }: IgetOrders) => {
  return useQuery({
    queryKey: ["orders", page, limit, period],
    queryFn: () => getOrders({ page, limit, period, status }),
    placeholderData: keepPreviousData,
    // Don't refetch the same query for 5 minutes
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
  });
};

export const useOrderAnalytics = () => {
  return useQuery({
    queryKey: ["order-analystics"],
    queryFn: orderAnalystics,
  });
};

export const useAdminOrders = ({ page, limit, period, status }: IgetOrders) => {
  return useQuery({
    queryKey: ["orders-admin", page, limit, period],
    queryFn: () => getAdminOrders({ page, limit, period, status }),
    placeholderData: keepPreviousData,
    // Don't refetch the same query for 5 minutes
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useAdminOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getAdminOrder(orderId),
  });
};

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminDashboard,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
