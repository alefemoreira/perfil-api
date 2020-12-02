import { Response, Request } from "express";
import { iRequest } from "../app/middlewares/auth";
import User from "../app/models/UserSchema";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export default class UserController {
  async index(req: Request, res: Response) {
    const users = await User.findAll();

    res.json(users);
  }

  async update(req: iRequest, res: Response) {
    const user_id = req.user_id;
    const { username, password, name, github_username, image } = req.body;

    let user = await User.findById(user_id);

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user doesn't exists" });
    }

    const update_data = {
      username: username || user.username,
      password_hash: password
        ? await bcrypt.hash(password, 8)
        : user.password_hash,
      name: name || user.name,
      github_username: github_username || user.github_username,
      image: image || user.image,
    };

    user = await user.updateOne(update_data);

    return res.json(user);
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
