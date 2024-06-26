'use client'
import { axiosInstance } from '@/lib/axios';
import { Custom, IFormCustomProduct } from '@/types/product.types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useCreateCustomProduct = () => {
  const router = useRouter();
  const createCustomProduct = async (payload: IFormCustomProduct) => {
    try {
      const { name, size, quantity, handle } = payload;

      const createCustomProductForm = new FormData();

      createCustomProductForm.append('name', name);
      createCustomProductForm.append('size', size);
      createCustomProductForm.append('quantity', String(quantity));
      createCustomProductForm.append('handle', String(handle));

      await axiosInstance.post<Custom>('/products', createCustomProductForm)

      // console.log('Response:', response)

      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Custom product gagal, coba lagi');
      }
    }
  };
  return { createCustomProduct };
};

export default useCreateCustomProduct;
