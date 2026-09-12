import {
  AdminOrder,
  AdminOrderAnalyticsResponse,
  ApiResponseData,
  CreateOrder,
  Order,
  OrderAnalyticsResponse,
  OrderStatus,
} from "@/features/orders/types";
import { api } from "../axios";

export interface IgetOrders {
  page: number;
  limit: number;
  period?: "" | "1day" | "1week" | "1month" | "6months" | "1year";
  status?: string;
}
export const getOrders = async ({
  page,
  limit,
  period,
  status,
}: IgetOrders) => {
  const { data } = await api.get<{
    data: ApiResponseData<Order[]>;
  }>("/orders", {
    params: {
      page,
      limit,
      ...(period && { period }),
      status,
    },
  });

  return data.data;
};
export const getAdminOrders = async ({
  page,
  limit,
  period,
  status,
}: IgetOrders) => {
  const { data } = await api.get<{
    data: ApiResponseData<AdminOrder[]>;
  }>("/admin/orders", {
    params: {
      page,
      limit,
      ...(period && { period }),
      status,
    },
  });

  return data.data;
};

export const getAdminOrder = async (orderId: string) => {
  const { data } = await api.get(`/admin/orders/${orderId}`);
  return data.data;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await api.get(`/orders/${orderId}`);
  return data.data;
};

export const createOrder = async (order: CreateOrder) => {
  const { data } = await api.post("/orders", order);
  return data;
};

export const updateOrder = async ({
  order,
  orderId,
}: {
  order: Partial<Order>;
  orderId: string;
}) => {
  const { data } = await api.put(`/orders/${orderId}`, order);
  return data;
};

export const updateAdminOrder = async ({
  status,
  orderId,
}: {
  status: OrderStatus;
  orderId: string;
}) => {
  const { data } = await api.put(`/admin/orders/${orderId}`, { status });
  return data;
};

export const deleteOrder = async (orderId: string) => {
  const { data } = await api.delete(`/orders/${orderId}`);

  return data;
};

export const orderAnalystics = async () => {
  const response = await api.get<OrderAnalyticsResponse>("/orders/analytics");

  return response.data.data;
};

export const getAdminDashboard = async () => {
  const { data } =
    await api.get<AdminOrderAnalyticsResponse>("/admin/analytics");
  return data.data;
};
