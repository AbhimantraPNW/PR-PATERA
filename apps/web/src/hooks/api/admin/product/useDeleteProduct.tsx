import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

const useDeleteProduct = () => {
  const { toast } = useToast();

  const deleteProduct = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/products/${id}`);

      toast({
        title: 'Success',
        description: 'Produk sukses dihapus',
      });

      // Reload page
      window.location.reload()
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

  return { deleteProduct };
};

export default useDeleteProduct;
