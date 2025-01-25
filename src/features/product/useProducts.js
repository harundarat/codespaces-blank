import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]); // menyimpan data response GET /products
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true); // waiting data
    try {
      setTimeout(async () => {
        const productsResponse = await axiosInstance.get("/products");
        setProducts(productsResponse.data);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    data: products,
    isLoading: isLoading,
  };
};
