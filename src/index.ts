import App from "./app.controller";
import AuthenticationController from "./controllers/authentication.controller";
import PostController from "./controllers/post.controller";
import { config } from "dotenv";
import UserController from "./controllers/user.controller";

// init env
config();

// init controllers
const app = new App(
  [new AuthenticationController(), new UserController(), new PostController()],
  5000
);

// start application
app.listen();
