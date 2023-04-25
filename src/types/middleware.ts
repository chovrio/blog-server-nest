import { NextFunction, Request, Response } from 'express';

export type MiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
