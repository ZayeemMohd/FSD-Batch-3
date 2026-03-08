const express = require("express");
const { TodoModel, UserModel } = require("./db");
const authMiddleware = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "i love india";

mongoose.connect(
  "mongodb+srv://user1:user1%40machine0@machine0.7pvrgpr.mongodb.net/todo_app",
);

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log("data recieved from frontend: ", username, password, email);

  await UserModel.create({
    username: username,
    password: password,
    email: email,
  });

  res.status(200).json({
    message: "user created and added in database successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (foundUser) {
    const token = jwt.sign(
      {
        id: foundUser._id.toString(),
      },
      JWT_SECRET,
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  }

  res.json({
    message: "Kyan hua miyan!, Idar Kidar 🤬",
  });
});

app.use(authMiddleware);

app.post("/todo", async (req, res) => {
  const { title, isDone } = req.body;
  const userId = req.userId;
  console.log("userId from /todo route:", userId);

  await TodoModel.create({
    title: title,
    isDone: isDone,
    userId: userId,
  });

  res.json({
    message: "Todo created and saved in db",
  });
});

app.get("/todos", async (req, res) => {
    const userId = req.userId;

    const response = await TodoModel.find({
        userId: userId
    })

    if(response){
        console.log(response)
        res.json({
            data: response
        })
    } else {
        res.json({
            message: "todos not found"
        })
    }
});

app.delete("/todo", async (req, res) => {
    const {todoId} = req.body;


    const response = await TodoModel.findByIdAndDelete(todoId)

    if(response){
        console.log(response)
        res.json({
            data: response
        })
    } else {
        res.json({
            message: "todos not found"
        })
    }
});

app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
