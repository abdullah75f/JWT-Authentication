const express = require("express");
const app = express();

app.use(express.json());

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
    res.status(400).json({ message: error.message });
  }
});

app.get("login", (req, res) => {
  //Authenticate User
});
app.listen(3000);
