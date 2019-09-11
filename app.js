const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "welcome to api"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post create...",
        authData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // mock user
  const user = {
    id: 1,
    usename: "thuy",
    email: "thuy@gmail.com"
  };
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// verifytoken
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  // check if bearer is undefined
  if (bearerHeader) {
    // Split the bearer by space
    const bearer = bearerHeader.split(" ");
    // get token from array
    const bearerToken = bearer[1];
    // set token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // forbidden 403
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("server started on 5000"));
