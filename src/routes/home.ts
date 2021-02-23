import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to TypedCode API");
});

router.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default router;
