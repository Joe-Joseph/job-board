/* eslint-disable no-undef */
import { jwtVerify } from 'jose';
import { HttpResponse } from 'msw';
import { tokenInfo, userData } from '../apiMocks/data/auth';

const encoder = new TextEncoder();

export function withAuth(handler) {
  return async (req) => {
    const bearerToken = req.request?.headers.get('authorization');

    const isNodeEnv =
      typeof window === 'undefined' || process.env.NODE_ENV === 'test';

    if (isNodeEnv) {
      return handler(req, userData);
    } else {
      if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const token = bearerToken.split(' ')[1];
      const { secretKey } = tokenInfo;

      try {
        const { payload } = await jwtVerify(token, encoder.encode(secretKey));

        return handler(req, payload);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        return HttpResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }
  };
}
