import { useFormik } from 'formik';
import { Lock, Mail, SquareUser } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { InputField } from '../../../components/InputField';
import { SubmitButton } from '../../../components/SubmitButton';
import { AccountExist } from './AccountExist';
import {
  signupInitialValues,
  signupValidationSchema,
} from '../forms/signupFormConfig';
import { clearError, signup } from '../../../store/slice/authSlice';

export const SignupForm = ({ isSignup, setIsSignup, setShowSignupSuccess }) => {
  const { error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      dispatch(clearError());

      try {
        await dispatch(signup(values)).unwrap();
        setShowSignupSuccess(true);
      } catch (error) {
        console.error('Signup Error: ', error);
      }
    },
  });

  return (
    <form className="mt-2" onSubmit={formik.handleSubmit}>
      {error ? (
        <div className="text-sm text-center text-red-400">{error}</div>
      ) : null}

      {/* First Name Field */}
      <InputField
        icon={SquareUser}
        type="text"
        placeholder="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        label={'First Name'}
        name="firstName"
        error={formik.touched.firstName && formik.errors.firstName}
        onBlur={formik.handleBlur}
      />

      {/* Last Name Field */}
      <InputField
        icon={SquareUser}
        type="text"
        placeholder="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        label={'Last Name'}
        name="lastName"
        error={formik.touched.lastName && formik.errors.lastName}
        onBlur={formik.handleBlur}
      />

      {/* Email Field */}
      <InputField
        icon={Mail}
        type="text"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        label={'Email'}
        name="email"
        error={formik.touched.email && formik.errors.email}
        onBlur={formik.handleBlur}
      />

      {/* Password Field */}
      <InputField
        icon={Lock}
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        label={'Password'}
        name="password"
        error={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
      />

      {/* Confirm Password Field */}
      <InputField
        icon={Lock}
        type="password"
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        label={'Confirm Password'}
        name="confirmPassword"
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        onBlur={formik.handleBlur}
      />

      {/* Submit Button */}
      <SubmitButton isLoading={loading} type={'submit'} text={'Sign Up'} />

      <AccountExist
        isSignup={isSignup}
        setIsSignup={() => {
          dispatch(clearError());
          setIsSignup(!isSignup);
        }}
      />
    </form>
  );
};
