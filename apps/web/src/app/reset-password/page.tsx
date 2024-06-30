'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useResetPassword from '@/hooks/api/admin/useResetPassword';
import { useFormik } from 'formik';
import { notFound, useSearchParams } from 'next/navigation';
import { validationSchema } from './validationSchema';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, Label } from '@roketid/windmill-react-ui';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    notFound();
  }

  const { resetPassword } = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: ({ password }) => {
        resetPassword(password, token);
      },
    });

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <main className="padding-container max-container mx-auto px-4">
      <div className="mb-7 mt-36 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl text-slate-600">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
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

                <FormInput
                  name="confirmPassword"
                  error={errors.confirmPassword}
                  isError={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="confirm password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  label="Confirm Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                <Label className="mt-4" check onClick={handleCheck}>
                  <Input
                    type="checkbox"
                    crossOrigin="anonymous"
                    checked={check}
                    onChange={handleCheck}
                  />
                  <span className="ml-2">I agree</span>
                </Label>

                <Button
                  type="submit"
                  className="w-full text-white"
                  disabled={!check}
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPassword;
