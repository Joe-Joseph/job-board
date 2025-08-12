import { http, HttpResponse } from 'msw';
import { loginCredentials, loginResponse, signupResponse } from '../data/auth';

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
    return HttpResponse.json(loginResponse);
  }

  return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
});
