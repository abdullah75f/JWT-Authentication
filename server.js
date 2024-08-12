require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [];

const posts = [
  {
    username: "kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];
app.get("/posts", (req, res) => {
  try {
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send();
  }
});

// registration or sign up
app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(200).send("Added as a new user");
  } catch (error) {
    res.status(500).send("Server Error!");
  }
});

//Logging in
app.post("/users/login", async (req, res) => {
  //Authenticate User
  const user = users.find((user) => user.name === req.body.name);
  if (user === null) {
    return req
      .status(400)
      .send("The user is not registered, please register first");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
      
      // res.status(400).send("Successfully Logged in");
    } else {
      res.status(400).send("Incorrect Credential !");
    }
  } catch (error) {
    res.status(500).send("Server Error!");
  }
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});
app.listen(3000);
