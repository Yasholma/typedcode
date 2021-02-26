import express, { Application, json } from "express";
import mongoose from "mongoose";
import cookerParser from "cookie-parser";
import { error, logger } from "./middlewares";
import { IController } from "./controllers/controller.interface";

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
    this.app.use(cookerParser());
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
    const dbURL: string = process.env.DATABASE_URL;
    try {
      await mongoose.connect(dbURL, {
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
