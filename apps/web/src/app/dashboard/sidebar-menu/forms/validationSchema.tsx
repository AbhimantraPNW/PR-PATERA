import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  name: Yup.string()
    .required('Name is required'),
  status: Yup.string().required('Status is required'),
  stock: Yup.number()
    .required('Stock is required'),
  size: Yup.string().required('Size is required'),
  price: Yup.number()
    .required('Price is required'),
  diameter: Yup.number()
    .required('Diameter is required'),
  tinggi: Yup.number()
    .required('Tinggi is required'),
  images: Yup.array()
    .of(Yup.mixed().required('An image file is required'))
    .min(1, 'At least one image is required')
    .max(4, 'Cannot upload more than 4 images'),
});
