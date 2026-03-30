import mongoose from "mongoose";

export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  }),
);

// todo: use .env to connect
mongoose.connect();
