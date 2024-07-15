import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  size: Yup.string().required('Required'),
  quantity: Yup.number()
  .min(12, 'The minimum quantity is 12')
  .required('Quantity is required'),
  handle: Yup.string().required('Required'),
//   productType: Yup.string().required('Required'),
});
