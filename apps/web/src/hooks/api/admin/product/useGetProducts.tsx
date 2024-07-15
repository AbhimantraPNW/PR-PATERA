'use client';

import { axiosInstance } from '@/lib/axios';
import { IPaginationMeta, IPaginationQueries } from '@/types/pagination.type';
import { Product } from '@/types/product.types';
import { useEffect, useState } from 'react';

interface IGetProductsQueries extends IPaginationQueries {
  search?: string;
}

const useGetProducts = (queries: IGetProductsQueries) => {
  const [stockData, setStockData] = useState<Product[]>([]);
  const [seasonalData, setSeasonalData] = useState<Product[]>([]);
  const [stockMeta, setStockMeta] = useState<IPaginationMeta | null>(null);
  const [seasonalMeta, setSeasonalMeta] = useState<IPaginationMeta | null>(
    null,
  );

  const getProducts = async () => {
    try {
      const { data: stockResponse } = await axiosInstance.get(
        '/admin/products',
        {
          params: { ...queries, status: 'Stock Product' },
        },
      );
      const { data: seasonalResponse } = await axiosInstance.get(
        '/admin/products',
        {
          params: { ...queries, status: 'Seasonal Product' },
        },
      );

      setStockData(stockResponse.stock.data);
      setStockMeta(stockResponse.stock.meta);
      setSeasonalData(seasonalResponse.seasonal.data);
      setSeasonalMeta(seasonalResponse.seasonal.meta);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries?.page, queries?.search]);

  return { stockData, stockMeta, seasonalData, seasonalMeta };
};

export default useGetProducts;
