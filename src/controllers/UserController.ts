import { Response, Request } from "express";
import User from "../models/UserSchema";

export default class UserController {
  index(req: Request, res: Response) {
    res.json({ message: "hello" });
  }

  async create(req: Request, res: Response) {
    let dev = await User.create({
      name: "Alefe",
      username: "alefemoreira",
      github_username: "alefemoreira",
      image:
        "https://avatars1.githubusercontent.com/u/43935776?s=460&u=61f06e620d752d959d8148484cf72480e95b3399&v=4",
    });

    res.json(dev);
  }
}
