export const loginCredentials = {
  email: import.meta.env.VITE_LOGIN_EMAIL,
  password: import.meta.env.VITE_LOGIN_PASSWORD,
};

export const fakeToken = import.meta.env.VITE_AUTH_TOKEN;

export const tokenInfo = {
  secretKey: import.meta.env.VITE_SECRET_KEY,
  expirationTime: import.meta.env.VITE_TOKEN_EXPIRATION_TIME,
};

export const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: loginCredentials.email,
};

export const loginResponse = {
  status: 200,
  user: userData,
  message: 'Login successful',
};

export const signupResponse = {
  status: 201,
  message: 'Account has been created successful!',
};
