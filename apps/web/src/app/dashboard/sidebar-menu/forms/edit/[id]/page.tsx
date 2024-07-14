'use client';

import Dropzone from '@/components/Dropzone';
import PreviewImages from '@/components/PreviewImages';
import { deleteImage } from '@/hooks/api/admin/images/useDeleteImages';
import useGetProduct from '@/hooks/api/admin/product/useGetProduct';
import useUpdateProduct from '@/hooks/api/admin/product/useUpdateProduct';
import { useAppSelector } from '@/redux/hooks';
import { IFormEditProduct, IProduct } from '@/types/product.types';
import { appConfig } from '@/utils/config';
import {
  Button,
  HelperText,
  Input,
  Label,
  Select,
} from '@roketid/windmill-react-ui';
import { useFormik } from 'formik';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../example/components/Typography/PageTitle';
import SectionTitle from '../../../../example/components/Typography/SectionTitle';
import Layout from '../../../../example/containers/Layout';

function Forms({ params }: { params: { id: string } }) {
  const { id } = useAppSelector((state) => state.user);
  const { updateProduct } = useUpdateProduct(Number(params.id));
  const { product: getProduct } = useGetProduct(Number(params.id));
  const [product, setProduct] = useState<IProduct | null>(null);
  const [check, setCheck] = React.useState(false);
  const [formattedPrice, setFormattedPrice] = React.useState('');

  const handleCheck = () => {
    setCheck(!check);
  };

  const formatPrice = (value: any) => {
    if (!value) return '';
    return `${parseFloat(value).toLocaleString('id-ID')}`;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFieldValue('price', value);
    setFormattedPrice(formatPrice(value));
  };

  //to remove image while update
  const handleDeleteImage = (index: number, imageId: number) => {
      deleteImage(imageId);
      const updatedExistingImages = [...values.existingImages];
      updatedExistingImages.splice(index, 1);
      setFieldValue('existingImages', updatedExistingImages);
    } 

  //dependency array, meaning it will run whenever the fetchedProduct changes.  
  useEffect(() => {
    if (getProduct) {
      const formattedProduct = {
        ...getProduct,
        images: getProduct.images.map((img: any) => ({
          id: img.id,
          url: img.url,
        })),
      };
      setProduct(formattedProduct);
    }
  }, [getProduct]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik<IFormEditProduct>({
    initialValues: {
      type: product?.type || '',
      name: product?.name || '',
      status: product?.status || '',
      stock: product?.stock.toString() || '',
      size: product?.size || '',
      price: product?.price.toString() || '',
      diameter: product?.diameter.toString() || '',
      tinggi: product?.tinggi.toString() || '',
      existingImages: product?.images.map(img => ({ id: img.id, url: img.url })) || [],
      images: [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateProduct({ ...values, userId: id });
    },
  });

  return (
    <Layout>
      <PageTitle>Forms</PageTitle>
      <SectionTitle>Edit Product</SectionTitle>

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
                {product?.type}
              </option>
            </Select>
            {errors.type && touched.type && (
              <HelperText className="text-red-400">{errors.type}</HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Name</span>
            <Input
              className="mt-1"
              placeholder={product?.name}
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
            <Label>Status</Label>
            <div className="mt-2">
              <Label radio>
                <div>
                  <Input
                    type="radio"
                    name="status"
                    crossOrigin="anonymous"
                    checked={Boolean(product?.status)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="ml-2">{product?.status}</span>
                </div>
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
              placeholder={product?.stock.toString()}
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
              <option value="">{product?.size}</option>
            </Select>
            {errors.size && touched.size && (
              <HelperText className="text-gray-400">{errors.size}</HelperText>
            )}
          </Label>

          <Label className="mt-4">
            <span>Price</span>
            <Input
              className="mt-1"
              placeholder={product?.price.toString()}
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
              placeholder={product?.diameter.toString()}
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
              placeholder={product?.tinggi.toString()}
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
            {values?.existingImages?.map((img, index) => (
              <div
                key={index}
                className="relative flex h-[200px] w-[200px] rounded-md border"
              >
                <Image
                  src={appConfig.baseUrl + `/assets${img.url}`}
                  alt="Image"
                  fill
                  objectFit="cover"
                />
                <Button
                  className="absolute -right-5 -top-5"
                  onClick={() => handleDeleteImage(index, img.id)}
                >
                  <Trash className="h-6 w-6" />
                </Button>
              </div>
            ))}

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
              onDrop={(files) => {
                setFieldValue('images', [...values.images, ...files]);
              }}
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
              I agree to the <span className="underline">update product</span>
            </span>
          </Label>

          <Label className="mt-3">
            <Button block className="mt-4" type="submit" disabled={!check}>
              Save changes
            </Button>
          </Label>
        </form>
      </div>
    </Layout>
  );
}

export default Forms;
