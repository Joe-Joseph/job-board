const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@test.com',
};

export const loginCredentials = {
  email: 'test@test.com',
  password: 'Password1!',
};

export const loginResponse = {
  status: 200,
  user: userData,
  message: 'Login successful',
  token: 'fake-jwt-token-12345',
};

export const signupResponse = {
  status: 201,
  message: 'Account has been created successful!',
};
