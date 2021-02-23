import { Request, Response, Router } from "express";
import Post, { IPost } from "../models/post.model";

class PostController {
  public router: Router = Router();
  public path: string = "/posts";
  private postModel: Post;

  constructor() {
    this.postModel = new Post();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getPosts);
    this.router.post(this.path, this.createPost);
  }

  getPosts = (req: Request, res: Response): void => {
    res.send(this.postModel.getPosts());
  };

  createPost = (req: Request, res: Response): void => {
    const postData: IPost = req.body;
    // TODO: validate data here
    res.send(this.postModel.createPost(postData));
  };
}

export default PostController;
