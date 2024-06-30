import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ForgotPasswordResponse {
  message: string;
}

const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetPassword = async (password: string, token: string) => {
    try {
      setIsLoading(true)
      await axiosInstance.patch<ForgotPasswordResponse>(
        '/admin/auth/reset-password',
        { password },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );
      toast({
        description: 'Reset password success',
        duration: 5000,
      });

      router.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: error.response?.data,
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading };
};

export default useResetPassword;
