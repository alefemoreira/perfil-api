import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password_hash: String,
  name: String,
  github_username: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

export default User;
