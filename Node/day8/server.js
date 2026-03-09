const express = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
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

// {
//   email: string,
//   password: string,
//   name: string
// }

app.post("/register", async (req, res) => {
  const requiredBodySchema = z.object({
    email: z.string().min(3).max(20).email(),
    password: z.string().min(3).max(20),
    username: z.string().min(3).max(10),
  });

  const parsedDataWithSuccess = requiredBodySchema.safeParse(req.body);

  console.log("parsed with success:", parsedDataWithSuccess);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Invalid format",
      error: parsedDataWithSuccess.error.message
    });
    return;
  }

  const { username, password, email } = req.body;
  console.log("data recieved from frontend: ", username, password, email);

  const hashedPassword = await bcrypt.hash(password, 5);

  await UserModel.create({
    username: username,
    password: hashedPassword,
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
  });

  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  console.log(passwordMatch);

  if (passwordMatch) {
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
  } else {
    res.json({
      message: "Kyan hua miyan!, Idar Kidar 🤬",
    });
  }
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
    userId: userId,
  });

  if (response) {
    console.log(response);
    res.json({
      data: response,
    });
  } else {
    res.json({
      message: "todos not found",
    });
  }
});

app.delete("/todo", async (req, res) => {
  const { todoId } = req.body;

  const response = await TodoModel.findByIdAndDelete(todoId);

  if (response) {
    console.log(response);
    res.json({
      data: response,
    });
  } else {
    res.json({
      message: "todos not found",
    });
  }
});

app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
