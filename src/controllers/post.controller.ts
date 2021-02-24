import { NextFunction, Request, Response, Router } from "express";
import { validateInputs } from "../middlewares";
import CreatePostDto from "../dtos/create-post.dto";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import Post from "../models/post.model";

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
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, validateInputs(CreatePostDto), this.createPost);
    this.router.patch(
      `${this.path}/:id`,
      validateInputs(CreatePostDto, true),
      this.updatePost
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await this.postModel.getPosts();

      res.send(posts);
    } catch (error) {
      res.status(500).send("Fetching all posts failed.");
    }
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const postId: string = req.params.id;
      const post = await this.postModel.getPostById(postId);

      if (post) {
        res.send(post);
      } else {
        next(new PostNotFoundException(postId));
      }
    } catch (error) {
      res.status(500).send("Fetching post failed.");
    }
  };

  private createPost = async (req: Request, res: Response): Promise<void> => {
    const createPostDto: CreatePostDto = req.body;
    try {
      const post = await this.postModel.createPost(createPostDto);
      res.status(201).send(post);
    } catch (error) {
      res.status(500).send("Creating post failed.");
    }
  };

  private updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const updateData = req.body;
    const postId = req.params.id;

    try {
      const post = await this.postModel.updatePost(postId, updateData);

      if (post) {
        res.send(post);
      } else {
        next(new PostNotFoundException(postId));
      }
    } catch (error) {
      res.status(500).send("Updating post failed.");
    }
  };

  private deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const postId: string = req.params.id;
      const result = await this.postModel.deletePost(postId);

      if (result) {
        res.send("Post deleted successfully.");
      } else {
        next(new PostNotFoundException(postId));
      }
    } catch (error) {
      res.status(500).send("Deleting post failed.");
    }
  };
}

export default PostController;
