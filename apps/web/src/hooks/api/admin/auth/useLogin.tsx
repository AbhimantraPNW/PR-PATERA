import { useToast } from '@/components/ui/use-toast';
import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface LoginArgs extends Omit<User, 'id' | 'fullName' | 'createdAt'> {
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
  token: string;
}

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        '/admin/auth/login',
        payload,
      );

      dispatch(loginAction(data.data));
      localStorage.setItem('token', data.token);
      toast({
        description: 'Login success',
        duration: 5000,
      });
      router.replace('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: error.response?.data,
          duration: 5000,
        });
      }
    }
  };

  return { login };
};

export default useLogin;
