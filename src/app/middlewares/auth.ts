import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { StatusCodes } from "http-status-codes";

export interface iRequest extends Request {
  user_id?: string;
}

interface iDecoded {
  id: string;
}

export default async (req: iRequest, res: Response, next: NextFunction) => {
  const auth_header = req.headers.authorization;

  if (!auth_header) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Token not provided" });
  }

  const [, token] = auth_header.split(" ");

  try {
    const app_secret = process.env.APP_SECRET as string;
    const decoded = (await promisify(jwt.verify)(
      token,
      app_secret
    )) as iDecoded;

    req.user_id = decoded.id;

    return next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Token invalid" });
  }
};
