import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ForgotPasswordResponse {
  message: string;
}

const useForgotPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await axiosInstance.post<ForgotPasswordResponse>(
        '/admin/auth/forgot-password',
        { email },
      );
      toast({
        description: 'Email reset password has been sent',
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

  return { forgotPassword, isLoading };
};

export default useForgotPassword;
