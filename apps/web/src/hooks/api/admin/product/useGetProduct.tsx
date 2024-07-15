'use client';

import { axiosInstance } from '@/lib/axios';
import { Product } from '@/types/product.types';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const useGetProduct = (id: number) => {
  const [data, setData] = useState<Product | null>(null);

  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get<Product>(
        `/admin/products/${id}`,
      );
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        //TODO : replace console.log with toast
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { product: data, refetch: getProduct };
};

export default useGetProduct;
