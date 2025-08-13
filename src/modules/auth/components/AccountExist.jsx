export const AccountExist = ({ setIsSignup, isSignup, buttonId }) => {
  return (
    <div className="mt-5 text-center">
      <p className="text-sm text-gray-600">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          className="font-semibold transition-colors cursor-pointer text-sky-600"
          onClick={setIsSignup}
          type="button"
          id={buttonId}
          data-testid={buttonId}
        >
          {isSignup ? 'Sign In' : 'Sign up'}
        </button>
      </p>
    </div>
  );
};
