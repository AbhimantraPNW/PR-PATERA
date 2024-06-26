'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import useCreateCustomProduct from '@/hooks/product/useCreateCustomProduct';
import { IFormCustomProduct } from '@/types/product.types';
import { useFormik } from 'formik';
import { categories, size } from './list';
import { validationSchema } from './validationSchema';
import Checkbox from '@/components/CheckboxInput';
// import { Checkbox } from '@/components/ui/checkbox';

const CustomProduct = () => {
  const { createCustomProduct } = useCreateCustomProduct();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik<IFormCustomProduct>({
    initialValues: {
      name: '',
      size: '',
      quantity: 12,
      handle: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
      createCustomProduct({ ...values });
    },
  });

  return (
    <main>
      <form onSubmit={handleSubmit}>
        MOTIF GELAS INPUT
        <div className="flex flex-col gap-4 w-1/2">
          <h1 className="text-xl font-semibold">Pilih motif produk</h1>
          <select
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="rounded-md border p-2 text-sm text-black/70"
          >
            <option value="" disabled selected>
              Select motif...
            </option>
            {categories.map((name) => (
              <option value={name}>{name}</option>
            ))}
          </select>
        </div>
        {/* UKURAN GELAS INPUT */}
        <div className="flex flex-col gap-4 w-1/2">
          <h1 className="text-xl font-semibold">Pilih ukuran produk</h1>
          <select
            name="size"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.size}
            className="rounded-md border p-2 text-sm text-black/70"
          >
            <option value="" disabled selected>
              Select ukuran...
            </option>
            {size.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
        </div>
        {/* PRODUCT QUANTITY */}
        <div className="flex flex-col gap-4 w-1/2">
          <h1 className="text-xl font-semibold">
            Berapa jumlah yang ingin dicustom?
          </h1>
          <FormInput
            name={'quantity'}
            placeholder={'Quantity'}
            type={'number'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.quantity}
            isError={!!touched.quantity && !!errors.quantity}
            label={'Product Quantity'}
            error={errors.quantity}
          />
        </div>
        {/* HANDLE INPUT CHECKBOX */}
        <div className="flex justify-evenly w-1/2 my-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withHandle"
              name="handle"
              checked={values.handle === true}
              onChange={() => setFieldValue('handle', true)}
            />
            <label
              htmlFor="withHandle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              With Handle
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="withoutHandle"
              name="handle"
              checked={values.handle === false}
              onChange={() => setFieldValue('handle', false)}
            />
            <label
              htmlFor="withoutHandle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Without Handle
            </label>
          </div>
        </div>
        {/* SUBMIT */}
        <div className="m-4 flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </main>
  );
};

export default CustomProduct;
