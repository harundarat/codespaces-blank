import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchProducts = () => {
  const productsQuery = useQuery({
    queryFn: async () => {
      const productsResponse = await axiosInstance.get("/products");
      return productsResponse;
    },
    refetchOnWindowFocus: false,
  });

  return {
    data: productsQuery.data?.data,
    isLoading: productsQuery.isLoading,
  };
};
