const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const loggerMiddleware = (req, res, next) => {
  console.log({
    Method: req.method,
    Route: req.hostname,
    time: new Date().toISOString(),
  });
  next();
};

const bouncerMiddleware = (req, res, next) => {
  const token = req.headers.subscriptiontoken;

  if (token === "secretToken@123") {
    next();
  } else {
    res.json({
      message: "phir kabhi aana",
    });
  }
};

app.use(loggerMiddleware);
app.use(bouncerMiddleware);

app.post("/movie", (req, res) => {
  console.log(req.body);
  console.log("movie add request recieved: ", req.body.movie);
  res.json({
    message: "request recieved we will work on it",
  });
});

app.get("/movies", (req, res) => {
  res.json({
    movies: ["Dhurandhar", "Dooms Days", "Dangal", "Dhoom"],
  });
});

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a + b,
  });
});

app.get("/multiply", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    ans: a * b,
  });
});

app.get("/divide", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    ans: a / b,
  });
});

app.get("/subtract", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    ans: a - b,
  });
});

app.listen(8080, () => {
  console.log("server is listenting at port: 8080");
});
