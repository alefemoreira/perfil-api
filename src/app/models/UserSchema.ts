import mongoose, { Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: String,
  password_hash: String,
  name: String,
  github_username: String,
  image: String,
});

userSchema.methods.checkPassword = function (password: String) {
  return bcrypt.compare(password, this.password_hash);
};

userSchema.methods.generateToken = function () {
  const app_secret = process.env.APP_SECRET as string;
  return jwt.sign({ id: this.id }, app_secret);
};

userSchema.statics.findAll = function () {
  return this.find({});
};

export interface iUser {
  username: string;
  password_hash: string;
  name: string;
  github_username: string;
  image: string;
}

export interface iUserBaseDocument extends iUser, Document {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): string;
}

export interface iUSerModel extends Model<iUserBaseDocument> {
  findAll(): Promise<Array<iUserBaseDocument>>;
}

export default mongoose.model<iUserBaseDocument, iUSerModel>(
  "User",
  userSchema
);
