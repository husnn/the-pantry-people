import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user == null) return res.sendStatus(401);
  next();
};

export default authMiddleware;
