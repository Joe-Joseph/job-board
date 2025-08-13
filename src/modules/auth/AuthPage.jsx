import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import { LeftContent } from './components/LeftContent';
import { ToggleMode } from '../../components/ToggleMode';
import { SignupForm } from './components/SignupForm';
import { SignupSuccessCard } from './components/SignupSuccessCard';
import { LoginForm } from './components/LoginForm';

export const LoginSignupPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Left Side */}
      <div className="flex md:flex-1 md:h-auto h-64 md:justify-end bg-gradient-to-br from-[#050A24] to-[#0a1545] dark:bg-gray-900 dark:from-transparent dark:to-transparent text-white">
        <LeftContent
          welcomeText={
            showSignupSuccess
              ? 'Account created'
              : isSignup
              ? 'Welcome'
              : 'Welcome Back'
          }
          description={
            showSignupSuccess
              ? 'Now you can login into your account'
              : isSignup
              ? 'Enter your information to create an account'
              : 'Login to continue to your dashboard'
          }
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center flex-1 bg-white border-t border-gray-700 dark:bg-gray-900">
        <div className="fixed z-10 top-4 right-4">
          <ToggleMode />
        </div>

        <div className="relative w-96 md:w-3/4 h-4/5 my-auto p-8 md:p-16 md:rounded-tr-xs md:rounded-br-xs flex items-center overflow-hidden dark:bg-gray-900 md:bg-white md:shadow-[0px_0px_8px_rgba(2,6,23,0.12),_10px_12px_30px_rgba(2,6,23,0.06)]" />
        <AnimatePresence mode="wait">
          <motion.div
            className="absolute w-full p-4 bg-white md:-ml-15 md:w-80 dark:bg-gray-900 md:border md:border-gray-100 md:dark:border-gray-800 md:rounded-lg md:p-6 md:shadow-sm"
            style={{ perspective: 1000 }}
            key={
              showSignupSuccess
                ? 'signup-success'
                : isSignup
                ? 'signup'
                : 'login'
            }
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {showSignupSuccess ? (
              <SignupSuccessCard
                setIsSignup={setIsSignup}
                setShowSignupSuccess={setShowSignupSuccess}
              />
            ) : isSignup ? (
              <SignupForm
                isSignup={isSignup}
                setIsSignup={setIsSignup}
                setShowSignupSuccess={setShowSignupSuccess}
              />
            ) : (
              <LoginForm setIsSignup={setIsSignup} isSignup={isSignup} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
