'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useLogin from '@/hooks/api/admin/useLogin';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { validationSchema } from './validationSchema';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Login = () => {
  const router = useRouter();
  const { login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        login(values);
      },
    });

  return (
    <main className="padding-container max-container mx-auto px-4">
      <Navbar />
      <div className="mb-7 mt-36 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl text-slate-600">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  name="email"
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="email"
                  type="email"
                  value={values.email}
                  label="Email"
                />

                <div>
                  <FormInput
                    name="password"
                    error={errors.password}
                    isError={!!touched.password && !!errors.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    label="Password"
                  />
                  <button
                    type="button"
                    className="mt-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p
                  className="cursor-pointer text-end text-xs"
                  onClick={() => router.push('/forgot-password')}
                >
                  Forgot Password?
                </p>
                <Button type="submit" className="mt-6 w-full text-white">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;
