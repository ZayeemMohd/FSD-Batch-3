const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: String,
  password: String,
  email: String,
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    isDone: Boolean
});

const TodoModel = mongoose.model("todos", Todo);
const UserModel = mongoose.model("users", User);

module.exports = {
    TodoModel,
    UserModel
}