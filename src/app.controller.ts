import express, { Application, json } from "express";
import { logger } from "./middlewares";

class App {
  public app: Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initilizeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initilizeMiddlewares() {
    this.app.use(json());
    this.app.use(logger);
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }
}

export default App;
