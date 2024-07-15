'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import useForgotPassword from '@/hooks/api/admin/auth/useForgotPassword';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import { validationSchema } from './validationSchema';

const ForgotPassword = () => {
  const { forgotPassword, isLoading } = useForgotPassword();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: ({ email }) => {
        forgotPassword(email);
      },
    });

  return (
    <main className="padding-container max-container mx-auto px-4">
      <div className="mt-36 flex justify-center mb-7">
        <Card className="w-[350px] ">
          <CardHeader className="space-y-4">
            <CardTitle className="text-center text-2xl text-slate-600">Forgot Password</CardTitle>
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

                <Button type="submit" className=" mt-6 w-full text-white" disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
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

export default ForgotPassword;
