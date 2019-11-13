const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    posts.length
      ? res.status(200).json(posts)
      : res.status(404).json({ message: "invalid query, please try again" });
  } catch {
    res
      .status(500)
      .json({ message: "could not retrieve records from the database" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db("posts").where({ id: id });
    post.length
      ? res.status(200).json(post)
      : res.status(404).json({ message: "invalid id" });
  } catch {
    res
      .status(500)
      .json({ message: "could not retrieve this record from the database" });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.title || !body.contents)
    res
      .status(404)
      .json({ message: "POST request must have both title and contents" });
  else {
    try {
      const post = await db.insert(body).into("posts");
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ message: "db problem: ", err: err });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const postUpdate = await db("posts")
      .where({ id })
      .update(changes);
    postUpdate === 1
      ? res.status(200).json({ message: "Post successfuly updated!" })
      : res.status(404).json({ message: "Invalid ID" });
  } catch (err) {
    res.status(500).json({ message: "db problem", err: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletePost = await db("posts")
      .where({ id })
      .del();
    deletePost
      ? res.status(200).json({ message: "Post successfully deleted." })
      : res.status(400).json({ message: "No post with that ID exists." });
  } catch (err) {
    res.status(500).json({ message: "db problem: ", err });
  }
});

module.exports = router;
