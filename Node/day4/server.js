const express = require("express");
const app = express();

// count the incoming request number
let requestCounter = 0;
let remainingRequest = 10;

// sasta middleware
function requestIncrease(req, res, next) {
  requestCounter++;
  console.log("request aayi, counter bada: ", requestCounter);
  next();
}

function requestRemaining(req, res, next) {
  remainingRequest--;
  console.log(
    "request aayi, bache we hai tumahre paas itte: ",
    remainingRequest,
  );
  if (remainingRequest > 0) {
    next();
  } else {
    res.json({
      message: "Bass abb bhhot hogaya ✋",
    });
  }
}

// /sum?a=1&b=2
app.get("/sum", requestIncrease, requestRemaining, (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  res.json({
    ans: a + b,
  });
});

app.get("/multiply", requestIncrease, requestRemaining, function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    ans: a * b,
  });
});

app.get("/divide", requestIncrease, function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    ans: a / b,
  });
});

app.get("/subtract", function (req, res) {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    ans: a - b,
  });
});

app.listen(3000, () => {
  console.log("Server is listenting on port 3000");
});
