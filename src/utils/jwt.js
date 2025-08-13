import { SignJWT } from 'jose';

export const createJWT = async (payload, secretKey, expirationTime) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(secretKey);

  return token;
};
