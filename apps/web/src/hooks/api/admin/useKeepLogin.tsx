import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.types';

interface KeepLoginResponse {
  message: string;
  data: User;
}

const useKeepLogin = () => {
  const dispatch = useAppDispatch();
  const keepLogin = async () => {
    try {
      const { data } =
        await axiosInstance.get<KeepLoginResponse>('/admin/auth/keep-login');

      dispatch(loginAction(data.data));
    } catch (error) {}
  };

  return { keepLogin };
};

export default useKeepLogin;
