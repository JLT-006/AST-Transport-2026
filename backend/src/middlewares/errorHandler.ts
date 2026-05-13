import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        res.status(409).json({ success: false, message: 'Duplicate value violates unique constraint' });
        return;
      case 'P2003':
        res.status(409).json({ success: false, message: 'Foreign key constraint failed' });
        return;
      case 'P2025':
        res.status(404).json({ success: false, message: 'Record not found' });
        return;
      default:
        res.status(400).json({ success: false, message: 'Database error' });
        return;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ success: false, message: 'Invalid request payload' });
    return;
  }

  if (err instanceof Error) {
    if (err.message === 'NOT_FOUND') {
      res.status(404).json({ success: false, message: 'Resource not found' });
      return;
    }
    if (err.message === 'SOFT_DELETE_UNSUPPORTED') {
      res.status(400).json({ success: false, message: 'Soft delete not supported for this resource' });
      return;
    }
    console.error('[error]', err);
    res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
    return;
  }

  console.error('[error] unknown', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
};
