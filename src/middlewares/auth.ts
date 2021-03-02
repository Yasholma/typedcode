import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/user/user.model";
import { IDataStoredInToken } from "../models/user/token-data.interface";
import IRequestWithUser from "../models/user/request-with-user.interface";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import AuthenticationTokenMissingException from "../exceptions/AuthenticationTokenMissingException";

const auth = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const { _id } = jwt.verify(
        cookies.Authorization,
        secret
      ) as IDataStoredInToken;

      const user = await new User().findById(_id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
};

export default auth;
