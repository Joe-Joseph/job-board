/* eslint-disable no-undef */
import { http, HttpResponse } from 'msw';
import {
  loginResponse,
  signupResponse,
  loginCredentials,
  userData,
  tokenInfo,
  fakeToken,
} from '../data/auth';
import { createJWT } from '../../utils/jwt';

export const signupHandler = http.post('/api/signup', async ({ request }) => {
  const body = await request.json();

  if (body.email === loginCredentials.email) {
    return HttpResponse.json({ error: 'Email already exist' }, { status: 409 });
  }

  return HttpResponse.json({ ...signupResponse, user: body });
});

export const loginHandler = http.post('/api/login', async ({ request }) => {
  const body = await request.json();

  const { email, password } = loginCredentials;

  if (body.email === email && body.password === password) {
    // Generate JWT
    const { expirationTime, secretKey } = tokenInfo;
    const tokenSecretKey = new TextEncoder().encode(secretKey);

    const isNodeEnv =
      typeof window === 'undefined' || process.env.NODE_ENV === 'test';

    let token;

    if (isNodeEnv) {
      token = fakeToken;
    } else {
      token = await createJWT(userData, tokenSecretKey, expirationTime);
    }

    return HttpResponse.json({ ...loginResponse, token });
  }

  return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
});
