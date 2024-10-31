import { NextFunction, Request, Response } from 'express';

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedOrigins = ['http://localhost:5173'];
  const origin = req.headers.origin;

  if (!origin) return;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
};
