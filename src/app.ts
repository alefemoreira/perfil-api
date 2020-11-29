import express, { Express } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

class AppController {
  express: Express;

  constructor() {
    this.express = express();
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASS;
    const db_name = process.env.MONGODB_NAME;

    mongoose
      .connect(
        `mongodb+srv://${user}:${password}@cluster0.7dpxc.mongodb.net/${db_name}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .catch((error) => {
        console.error("Unable to connecte with Cluster: \n", error);
      });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new AppController().express;
