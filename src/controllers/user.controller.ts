import { NextFunction, Response, Router } from "express";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";
import { auth } from "../middlewares";
import IRequestWithUser from "../models/user/request-with-user.interface";
import User from "../models/user/user.model";
import { IController } from "./controller.interface";

class UserController implements IController {
  path: string = "/users";
  router: Router = Router();
  private userModel: User;

  constructor() {
    this.userModel = new User();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id/posts`, auth, this.getAllPosts);
  }

  getAllPosts = async (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.id;
    try {
      if (userId === req.user._id.toString()) {
        const posts = await this.userModel.getAllUserPosts(req.user);
        res.send(posts);
      }
      next(new NotAuthorizedException());
    } catch (error) {
      res.status(500).send("Fetching user's post failed.");
    }
  };
}

export default UserController;
