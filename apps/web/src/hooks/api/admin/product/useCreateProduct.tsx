import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { IFormProduct, Product } from '@/types/product.types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';

const useCreateProduct = () => {
  const router = useRouter();
  const { toast } = useToast();
  const createProduct = async (payload: IFormProduct) => {
    try {
      const {
        type,
        name,
        status,
        stock,
        size,
        price,
        images,
        diameter,
        tinggi,
        userId,
      } = payload;

      const createProductForm = new FormData();

      createProductForm.append('type', type);
      createProductForm.append('name', name);
      createProductForm.append('status', status);
      createProductForm.append('stock', String(stock));
      createProductForm.append('size', size);
      createProductForm.append('price', String(price));
      createProductForm.append('diameter', String(diameter));
      createProductForm.append('tinggi', String(tinggi));
      createProductForm.append('userId', String(userId));

      images.forEach((file: FileWithPath) => {
        createProductForm.append('image', file);
      });

      await axiosInstance.post<Product>("/admin/products", createProductForm)

      toast({
        title: 'Product Created',
        description: 'Produk sukses dibuat',
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

  return { createProduct };
};

export default useCreateProduct;
