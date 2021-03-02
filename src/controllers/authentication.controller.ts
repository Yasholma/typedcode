import { NextFunction, Request, Response, Router } from "express";
import { validateInputs } from "../middlewares";
import User from "../models/user/user.model";
import CreateUserDto from "../dtos/create-user.dto";
import { IController } from "./controller.interface";
import UserWithThatEmailAlreadyExistException from "../exceptions/UserWithThatEmailAlreadyExistException";
import bcrypt from "bcrypt";
import LoginDto from "../dtos/login.dto";
import WrongCredentialsException from "../exceptions/WrongCredentialsException";
import { ITokenData } from "../models/user/token-data.interface";

class AuthenticationController implements IController {
  public path: string = "/auth";
  public router: Router = Router();
  private userModel: User;

  constructor() {
    this.userModel = new User();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validateInputs(LoginDto),
      this.login
    );
    this.router.post(
      `${this.path}/register`,
      validateInputs(CreateUserDto),
      this.register
    );
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private createCookie({ token, expiresIn }: ITokenData): string {
    return `Authorization=${token}; HttpOnly; Max-Age=${expiresIn}`;
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password, address }: CreateUserDto = req.body;

    try {
      // check if user with this email already exist
      const userExist = await this.userModel.findByEmail(email);
      if (userExist) {
        next(new UserWithThatEmailAlreadyExistException(email));
      }

      // hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        address,
      });

      // delete password
      user.password = undefined;
      const tokenData = this.userModel.createToken(user);

      res.header("Set-Cookie", [this.createCookie(tokenData)]);
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Registering user failed.");
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginDto = req.body;
    try {
      const user = await this.userModel.findByEmail(email);
      if (user) {
        const isMatched: boolean = await bcrypt.compare(
          password,
          user.password
        );
        if (isMatched) {
          user.password = undefined;
          const tokenData = this.userModel.createToken(user);

          res.header("Set-Cookie", [this.createCookie(tokenData)]);
          res.send(user);
        } else {
          next(new WrongCredentialsException());
        }
      } else {
        next(new WrongCredentialsException());
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Login user in failed.");
    }
  };

  private logout = (req: Request, res: Response) => {
    res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    res.send("User logout.");
  };
}

export default AuthenticationController;
