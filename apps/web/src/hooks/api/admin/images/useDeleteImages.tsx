import { axiosInstance } from '@/lib/axios';

  const deleteImage = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/images/${id}`);
    } catch (error) {
      throw error;
    }
  };
  
  export { deleteImage };
