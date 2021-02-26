import App from "./app.controller";
import AuthenticationController from "./controllers/authentication.controller";
import PostController from "./controllers/post.controller";
import { config } from "dotenv";

// init env
config();

// init controllers
const app = new App(
  [new AuthenticationController(), new PostController()],
  5000
);

// start application
app.listen();
