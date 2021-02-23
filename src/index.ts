import App from "./app.controller";
import PostController from "./controllers/post.controller";

const app = new App([new PostController()], 5000);
app.listen();
