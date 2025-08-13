import { Lock, Mail } from 'lucide-react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { InputField } from '../../../components/InputField';
import { SubmitButton } from '../../../components/SubmitButton';
import { AccountExist } from './AccountExist';
import {
  loginInitialValues,
  loginValidationSchema,
} from '../forms/loginFormConfig';
import { clearError, login } from '../../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ isSignup, setIsSignup }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      dispatch(clearError());
      try {
        await dispatch(
          login({ email: values.email, password: values.password })
        ).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Login Error: ', error);
      }
    },
  });

  return (
    <form className="mt-2" onSubmit={formik.handleSubmit}>
      {error ? (
        <div className="text-sm text-center text-red-400">{error}</div>
      ) : null}
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
        email
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

      {/* Submit Button */}
      <SubmitButton
        id="signin"
        isLoading={loading}
        type={'submit'}
        text={'Sign In'}
      />
      <AccountExist
        isSignup={isSignup}
        setIsSignup={() => {
          dispatch(clearError());
          setIsSignup(!isSignup);
        }}
        buttonId="signupRedirect"
      />
    </form>
  );
};
