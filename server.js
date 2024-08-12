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
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post("login", (req, res) => {
  //Authenticate User
  const username = req.body.name;
});
app.listen(3000);
