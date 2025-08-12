import * as Yup from 'yup';

export const loginInitialValues = {
  email: '',
  password: '',
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .min(2, 'Minimum 2 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});
