import { Response, Request } from "express";
import User from "../app/models/UserSchema";
import { StatusCodes } from "http-status-codes";

export default class SessionController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User doesn't exists" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    return res.json({
      user,
      token: "Bearer " + user.generateToken(),
    });
  }
}
