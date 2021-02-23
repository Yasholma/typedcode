import { Application } from "express";
import homeRoutes from "./home";

export default function (app: Application) {
  app.use("/", homeRoutes);
}
