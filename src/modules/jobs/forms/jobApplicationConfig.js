import * as Yup from 'yup';
import {
  MAXIMUM_FILE_SIZE,
  SUPPORTED_FILE_FORMATS,
} from '../../../utils/constants';

const storedUser = localStorage.getItem('user');

// Convert to object
const user = storedUser ? JSON.parse(storedUser) : null;

export const initialValues = {
  firstName: user?.firstName,
  lastName: user?.lastName,
  email: user?.email,
  currentLocation: '',
  linkedinProfile: '',
  portfolio: '',
  resume: '',
  coverLetter: '',
};

const fileRequired = (value) => {
  return value?.size && value?.size > 0;
};
const fileFormatValid = (value) =>
  !value || SUPPORTED_FILE_FORMATS.includes(value.type);

const fileSizeValid = (value) => !value || value.size <= MAXIMUM_FILE_SIZE;

export const validationSchema = Yup.object({
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

  currentLocation: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Location is required'),

  linkedinProfile: Yup.string().url('Must be a valid URL').nullable(),

  portfolio: Yup.string().url('Must be a valid URL').nullable(),

  resume: Yup.mixed()
    .test('fileRequired', 'Resume is required', fileRequired)
    .test('fileFormat', 'Only PDF files are allowed', fileFormatValid)
    .test('fileSize', 'Maximum file size should be 5MB', fileSizeValid),

  coverLetter: Yup.mixed()
    .test('fileRequired', 'Cover Letter is required', fileRequired)
    .test('fileFormat', 'Only PDF files are allowed', fileFormatValid)
    .test('fileSize', 'Maximum file size should be 5MB', fileSizeValid),
});
