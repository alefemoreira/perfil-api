import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  github_username: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

export default User;
