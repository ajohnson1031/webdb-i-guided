const express = require("express");

const PostRouter = require("./posts/post-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", PostRouter);

server.get("/", PostRouter, (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});

server.get("/:id", PostRouter, (req, res) => {
  res.send("<p>Because knex is the kbest!<p>");
});

server.post("/", PostRouter, (req, res) => {
  res.send("<p>Knexium! Now treating extreme flatulence.<p>");
});

server.put("/:id", PostRouter, (req, res) => {
  res.send("<p>Side effects include json responses.<p>");
});

server.delete("/:id", PostRouter, (req, res) => {
  res.send("<p>Ask your developer if knex is right for you.<p>");
});

module.exports = server;
