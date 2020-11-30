import { Response, Request } from "express";
import User from "../app/models/UserSchema";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export default class UserController {
  update(req: Request, res: Response) {
    res.json({ message: "hello" });
  }

  async create(req: Request, res: Response) {
    const { username, password, name, github_username, image } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    user = await User.create({
      username,
      password_hash: await bcrypt.hash(password, 8),
      name,
      github_username,
      image,
    });

    return res.json(user);
  }
}
