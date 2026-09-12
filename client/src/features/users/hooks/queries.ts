"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users-count"],
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: 1,
          offset: 0,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to fetch users");
      }

      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
