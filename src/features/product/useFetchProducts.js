import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchProducts = () => {
  return useQuery({
    queryFn: async () => {
      const productsResponse = await axiosInstance.get("/products");
      return productsResponse;
    },
    refetchOnWindowFocus: false,
  });
};
