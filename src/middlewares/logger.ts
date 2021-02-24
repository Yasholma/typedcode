import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default logger;
