import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  image: Yup.array()
    .of(Yup.mixed().required('An image file is required'))
    .min(1, 'At least one image is required')
    .max(4, 'Cannot upload more than 4 images'),
});
