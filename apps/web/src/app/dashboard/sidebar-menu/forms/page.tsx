'use client';

import Dropzone from '@/components/Dropzone';
import PreviewImages from '@/components/PreviewImages';
import useCreateProduct from '@/hooks/api/admin/product/useCreateProduct';
import { useAppSelector } from '@/redux/hooks';
import { IFormProduct } from '@/types/product.types';
import {
  Button,
  HelperText,
  Input,
  Label,
  Select,
} from '@roketid/windmill-react-ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import CTA from '../../example/components/CTA';
import PageTitle from '../../example/components/Typography/PageTitle';
import SectionTitle from '../../example/components/Typography/SectionTitle';
import Layout from '../../example/containers/Layout';
import {
  productSize,
  productStatus,
  productType,
} from '../../utils/demo/formProductData';
import { validationSchema } from './validationSchema';

function Forms() {
  const { createProduct } = useCreateProduct();
  const { id } = useAppSelector((state) => state.user);
  const [check, setCheck] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState('');

  const handleCheck = () => {
    setCheck(!check);
  };

  const formatPrice = (value: any) => {
    if (!value) return '';
    return `${parseFloat(value).toLocaleString('id-ID')}`;
  };

  const handlePriceChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFieldValue('price', value);
    setFormattedPrice(formatPrice(value));
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik<IFormProduct>({
    initialValues: {
      type: '',
      name: '',
      status: '',
      stock: '',
      size: '',
      price: '',
      diameter: '',
      tinggi: '',
      images: [],
    },
    validationSchema,
    onSubmit: (values) => {
      createProduct({ ...values, userId: id });
    },
  });

  return (
    <Layout>
      <PageTitle>Forms</PageTitle>
      <CTA />
      <SectionTitle>Create Product</SectionTitle>

      <div className="mb-8 rounded-lg bg-white px-4 py-3 shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <Label>
            <span>Type</span>
            <Select
              className="rounded-none border border-stone-300"
              style={{ maxWidth: '150px' }}
              name="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" className="text-gray-400">
                Select type
              </option>
              {productType.map((product, i) => (
                <option key={i} value={product.type}>
                  {product.type}
                </option>
              ))}
            </Select>
            {errors.type && touched.type && (
              <HelperText className="text-red-400">{errors.type}</HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Name</span>
            <Input
              className="mt-1"
              placeholder="Cups Name"
              crossOrigin="anonymous"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && (
              <HelperText className="text-red-400">{errors.name}</HelperText>
            )}
          </Label>

          <div className="mt-4">
            {/* TODO: Check if this label is accessible, or fallback */}
            {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
            <Label>Status</Label>
            <div className="mt-2">
              <Label radio>
                {productStatus.map((product, i) => (
                  <div key={i} className="px-2">
                    <Input
                      type="radio"
                      name="status"
                      crossOrigin="anonymous"
                      value={product.status}
                      checked={values.status === product.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span className="ml-2" key={i}>
                      {product.status}
                    </span>
                  </div>
                ))}
              </Label>
            </div>
            {errors.status && touched.status && (
              <HelperText className="text-red-400">{errors.status}</HelperText>
            )}
          </div>

          <Label className="mt-4">
            <span>Jumlah Stock</span>
            <Input
              type="number"
              className="mt-1"
              name="stock"
              placeholder="Masukkan jumlah stock"
              crossOrigin="anonymous"
              value={values.stock}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.stock && touched.stock && (
              <HelperText className="text-red-400">{errors.stock}</HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Size</span>
            <Select
              className="rounded-none border border-stone-300"
              style={{ maxWidth: '150px' }}
              name="size"
              value={values.size}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select size</option>
              {productSize.map((product, i) => (
                <option key={i}>{product.size}</option>
              ))}
            </Select>
            {errors.size && touched.size && (
              <HelperText className="text-gray-400">{errors.size}</HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Price</span>
            <Input
              className="mt-1"
              placeholder=".. Rp"
              crossOrigin="anonymous"
              name="price"
              value={formatPrice(values.price)}
              onChange={handlePriceChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price && (
              <HelperText className="text-red-400">{errors.price}</HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Diameter</span>
            <Input
              className="mt-1"
              placeholder=".. cm"
              crossOrigin="anonymous"
              name="diameter"
              value={values.diameter}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.diameter && touched.diameter && (
              <HelperText className="text-red-400">
                {errors.diameter}
              </HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Tinggi</span>
            <Input
              className="mt-1"
              placeholder=".. cm"
              crossOrigin="anonymous"
              name="tinggi"
              value={values.tinggi}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.tinggi && touched.tinggi && (
              <HelperText className="text-red-400">{errors.tinggi}</HelperText>
            )}
          </Label>

          <div className="mt-2">
            <PreviewImages
              fileImages={values.images}
              onRemoveImage={(idx: number) =>
                setFieldValue('images', values.images.toSpliced(idx, 1))
              }
            />
          </div>

          <div className="mt-2">
            <Dropzone
              isError={Boolean(errors.images)}
              label="Image"
              onDrop={(files) =>
                setFieldValue('images', [...values.images, ...files])
              }
            />
            {errors.images && touched.images && (
              <HelperText className="text-red-400">
                <>{errors.images}</>
              </HelperText>
            )}
          </div>

          <Label className="mt-3" check>
            <Input
              type="checkbox"
              crossOrigin="anonymous"
              onClick={handleCheck}
            />
            <span className="ml-2">
              I agree to the <span className="underline">create product</span>
            </span>
          </Label>

          <Label className="mt-3">
            <Button block className="mt-4" type="submit" disabled={!check}>
              Create product
            </Button>
          </Label>
        </form>
      </div>
    </Layout>
  );
}

export default Forms;
