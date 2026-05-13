import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret || rawSecret.length < 16) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set (>= 16 chars) in production');
  }
  console.warn('[jwt] JWT_SECRET missing/short — using dev fallback. DO NOT USE IN PROD.');
}

const SECRET: Secret = rawSecret || 'ast_dev_secret_only_change_me_now';

export const signToken = (payload: object, expiresIn: SignOptions['expiresIn'] = '1d') => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
