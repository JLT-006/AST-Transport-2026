import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const SECRET: Secret = process.env.JWT_SECRET || 'ast_secret_2026_dev';

export const signToken = (payload: object, expiresIn: SignOptions['expiresIn'] = '1d') => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
