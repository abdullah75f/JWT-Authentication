const express = require("express");
const app = express();

app.get("/posts", (req, res) => {
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
});
app.listen(3000);
