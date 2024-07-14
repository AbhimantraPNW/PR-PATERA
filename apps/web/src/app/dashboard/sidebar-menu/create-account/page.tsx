'use client';

import useRegister from '@/hooks/api/admin/auth/useRegister';
import {
  Button,
  HelperText,
  Input,
  Label,
  WindmillContext,
} from '@roketid/windmill-react-ui';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { validationSchema } from './validationSchema';
import Navbar from '@/components/Navbar';

function CrateAccount() {
  const { mode } = useContext(WindmillContext);
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const router = useRouter();
  const { register } = useRegister();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      register(values);
      router.push('/login');
    },
  });

  const imgSource =
    mode === 'dark'
      ? '/assets/img/create-account-office-dark.jpeg'
      : '/assets/img/create-account-office.jpeg';

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center bg-gray-50 p-6 dark:bg-gray-900">
        <div className="mx-auto h-full max-w-4xl flex-1 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="relative h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="h-full w-full object-cover"
                src={imgSource}
                alt="Office"
                layout="fill"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Create account
                </h1>
                <form onSubmit={formik.handleSubmit}>
                  <Label>
                    <span>Name</span>
                    <Input
                      className="mt-1"
                      type="text"
                      placeholder="name"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      crossOrigin="anonymous"
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <HelperText className="text-red-400">
                        {formik.errors.fullName}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-2">
                    <span>Email</span>
                    <Input
                      className="mt-1"
                      type="email"
                      name="email"
                      placeholder="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      crossOrigin="anonymous"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <HelperText className="text-red-400">
                        {formik.errors.email}
                      </HelperText>
                    )}
                  </Label>
                  <Label className="mt-4">
                    <span>Password</span>
                    <Input
                      className="mt-1"
                      placeholder="***************"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      crossOrigin="anonymous"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <HelperText className="text-red-400">
                        {formik.errors.password}
                      </HelperText>
                    )}
                  </Label>
                  <Label
                    className="cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Label>

                  <Label className="mt-6" check onClick={handleCheck}>
                    <Input
                      type="checkbox"
                      crossOrigin="anonymous"
                      checked={check}
                      onChange={handleCheck}
                    />
                    <span className="ml-2">
                      I agree to the{' '}
                      <span className="underline">create account</span>
                    </span>
                  </Label>

                  <Button
                    block
                    className="mt-4"
                    type="submit"
                    disabled={!check}
                  >
                    Create account
                  </Button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrateAccount;
