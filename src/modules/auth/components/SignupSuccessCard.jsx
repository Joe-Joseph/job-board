import { ArrowRight, CheckCircle } from 'lucide-react';
import { SubmitButton } from '../../../components/SubmitButton';

export const SignupSuccessCard = ({ setIsSignup, setShowSignupSuccess }) => {
  return (
    <>
      {/* Success icon with animation */}
      <div className="flex justify-center py-5">
        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 transition-all duration-500 transform rounded-full shadow-lg bg-gradient-to-r from-emerald-400 to-green-500 hover:scale-110">
            <CheckCircle className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-6 text-center">
        <div>
          <h1 className="mb-2 text-xl italic font-extrabold tracking-tight text-gray-600 md:text-2xl">
            Welcome aboard!
          </h1>
          <p className="text-base leading-relaxed text-gray-600 md:text-md">
            Your account has been created successfully. We're excited to have
            you join our platform.
          </p>
        </div>

        <SubmitButton
          text={'Login'}
          icon={ArrowRight}
          type={'button'}
          handleClick={() => {
            setIsSignup(false);
            setShowSignupSuccess(false);
          }}
        />
      </div>
    </>
  );
};
