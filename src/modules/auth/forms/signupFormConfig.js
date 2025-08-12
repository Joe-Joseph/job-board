import * as Yup from 'yup';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,40}$/;

const passwordValidationMessage =
  'Must be in a range of 8-40 characters. At least one upper case letter, one lower case, and one number.';

export const signupInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const signupValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .min(2, 'Minimum 2 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .matches(passwordRegex, passwordValidationMessage)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
