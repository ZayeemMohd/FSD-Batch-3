const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  console.log("token recieved from frontend: ", token);
  const payload = jwt.verify(token, JWT_SECRET);
  console.log("payload recieved inside token: ", payload);

  if (payload) {
    req.userId = payload.id;
    next();
  } else {
    res.json({
      message: "OO bhai Idar Kidar ✋",
    });
  }
};

module.exports = authMiddleware;