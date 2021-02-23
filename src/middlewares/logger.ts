import { Request, Response } from "express";

const logger = (req: Request, res: Response, next: () => void): void => {
  console.log(`${req.method} ${req.path}`);
  next();
};

export default logger;
