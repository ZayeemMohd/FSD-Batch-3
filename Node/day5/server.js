const e = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const JWT_SECRET =  "I_love_nodejs";
console.log("jwt secret recieved from .env: ", JWT_SECRET);

app.use(express.json());


const users = [{}];

// should return a random long sting
// const generateToken = () => {
//   let options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];

//   let token = "";

//   for (let i = 0; i < 32; i++) {
//     // 0 - 36 options[35]
//     token = token + options[Math.floor(Math.random() * options.length)];
//   }

//   return token;
// };

const authMiddleware = (req, res, next) => {
  const tokenFromClient = req.headers.token;
  console.log(tokenFromClient);

  // db call 
//   const user = users.find((user) => user.token === tokenFromClient);

const user = jwt.verify(tokenFromClient, JWT_SECRET)
console.log(user)

  if (user.username) {
    req.foundUser = user.username;
    next();
  } else {
    res.status(403).json({
      message: "Idar kidhar ✋, tumaku bulae ic nai"
    });
  }
};

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  if (users.find((user) => user.username === username)) {
    res.json({
      message: "user already exists",
    });
    return;
  }

  if (password.lenth < 8) {
    res.json({
      message: "your password is weak",
    });
    return;
  }

  users.push({
    username: username,
    password: password,
    email: email,
  });

  console.log(users);

  res.json({
    message: "Signedup successfully, new user added",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (user) {
    const token = jwt.sign({
        username: user.username
    }, JWT_SECRET);

    console.log(users);
    res.send({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid username or password",
      status: 403,
    });
  }
});

app.use(authMiddleware);

app.get("/restaurants", (req, res) => {
       res.json({
        data: `Hi, ${req.foundUser}, tumhara restaurants ye hai`
    })
});

app.get("/courses", (req, res) => {
    res.json({
        data: `Hi, ${req.foundUser}, tumhara courses ye hai`
    })
});

app.get("/me",  (req, res) => {
  res.json({
    data: `Hi ${req.foundUser}, tumhara profile ye hai`,
  });
});

const port = 8080;
app.listen(port, () => {
  console.log("Server is listening at port: ", port);
});
