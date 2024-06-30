'use client';

import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!id && !isLoading) {
        redirect('/login');
      }
    }, [id, isLoading]);  

    return <Component {...props} />;
  };
}
