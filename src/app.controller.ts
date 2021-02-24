import express, { Application, json, Router } from "express";
import config from "config";
import mongoose from "mongoose";
import { error, logger } from "./middlewares";

interface IController {
  path: string;
  router: Router;
}

class App {
  public app: Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.app = express();
    this.port = +process.env.PORT || port;

    this.connectToDatabase();
    this.initilizeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`);
    });
  }

  private initilizeMiddlewares() {
    this.app.use(json());
    this.app.use(logger);
  }

  private initializeErrorMiddleware() {
    this.app.use(error);
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  private async connectToDatabase() {
    try {
      await mongoose.connect(config.get("dbConfig.url"), {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log("Connected to the database.");
    } catch (error) {
      console.log("Connection to the database failed.", error.stack);
    }
  }
}

export default App;
