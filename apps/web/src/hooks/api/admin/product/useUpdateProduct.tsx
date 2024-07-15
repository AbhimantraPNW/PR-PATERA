'use client';

import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { IFormEditProduct } from '@/types/product.types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';

const useUpdateProduct = (productId: number) => {
  const router = useRouter();
  const { toast } = useToast();

  const updateProduct = async (payload: IFormEditProduct) => {
    try {
      const {
        name,
        stock,
        price,
        diameter,
        tinggi,
        images,
        existingImages,
      } = payload;

      const updateProductForm = new FormData();

      if (name) {
        updateProductForm.append('name', name);
      }

      if (stock) {
        updateProductForm.append('stock', stock);
      }

      if (price) {
        updateProductForm.append('price', price);
      }

      if (diameter) {
        updateProductForm.append('diameter', diameter);
      }

      if (tinggi) {
        updateProductForm.append('tinggi', tinggi);
      }

      if (images) {
        images.forEach((file: FileWithPath) => {
          updateProductForm.append('images', file);
        });
      }

      if (existingImages) {
        existingImages.forEach((url) => {
          updateProductForm.append('existingImages', String(url));
        });
      }
            
      await axiosInstance.patch(
        `/admin/products/${productId}`,
        updateProductForm,
      );

      toast({
        title: 'Success',
        description: 'Perubahan produk sukses diganti',
      });

      router.push('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error',
          description: error.response?.data,
          duration: 5000,
        });
      }
    }
  };

  return { updateProduct };
};

export default useUpdateProduct;
