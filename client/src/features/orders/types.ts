export type OrderStatus =
  | "pending"
  | "accepted"
  | "dispatched"
  | "delivered"
  | "rejected";

export interface BaseOrder {
  grade: string;
  quantity: number;
  date: string;
  address: string;
}

export interface Order extends BaseOrder {
  _id: string;
  status: OrderStatus;
  createdAt: string;
}

export interface AdminOrder extends BaseOrder {
  _id: string;
  user: UserSummary;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrder extends BaseOrder {}

export interface UserSummary {
  _id: string;
  name: string;
  email: string;
}

export interface OrderAnalyticsOrderCounts {
  total: number;
  pending: number;
  accepted: number;
  dispatch: number;
  delivered: number;
  rejected: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalOrders: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponseData<T = Order[]> {
  orders: T;
  pagination: PaginationInfo;
}

export interface OrderAnalyticsResponse {
  data: {
    orders: OrderAnalyticsOrderCounts;
    totalQuantity: number;
    recentOrders: Order[];
  };
}
export interface AdminOrderAnalyticsResponse {
  data: {
    orders: OrderAnalyticsOrderCounts;
    totalQuantity: number;
    recentOrders: AdminOrder[];
  };
}
