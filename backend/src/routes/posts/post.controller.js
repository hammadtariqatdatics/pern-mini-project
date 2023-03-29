const express = require("express");
const router = express.Router();
const db = require("../../../db/models");
const createPostSchema = require("./validationSchema");
const { authHandler } = require("../../middleware/auth");
const { Post } = db;

// Retrieve all Posts
router.get("/", authHandler, async (req, res) => {
  const data = await Post.findAll();
  if (data) {
    res.status(200).send(data);
  } else {
    res
      .status(400)
      .send({ message: "There is some error in getting Posts data" });
  }
});

// Retrieve a single Post with id
router.get("/:id", authHandler, async (req, res) => {
  const id = req.params.id;

  const data = await Post.findByPk(id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(400).send({
      message: `Cannot find Post with id=${id}.`,
    });
  }
});

// Update a Post with id
router.put("/:id", authHandler, async (req, res) => {
  const id = req.params.id;
  const num = await Post.update(req.body, {
    where: { id: id },
  });

  if (num == 1) {
    res.status(200).send({
      message: "Post was updated successfully.",
    });
  } else {
    res.status(400).send({
      message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
    });
  }
});

// Delete a Post with id
router.delete("/:id", authHandler, async (req, res) => {
  const id = req.params.id;

  const num = await Post.destroy({
    where: { id: id },
  });
  if (num == 1) {
    res.status(200).send({
      message: "Post was deleted successfully!",
    });
  } else {
    res.status(400).send({
      message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
    });
  }
});

// Delete all Posts
router.delete("/", authHandler, async (req, res) => {
  const nums = await Post.destroy({
    where: {},
    truncate: false,
  });
  res.status(200).send({ message: `${nums} Posts were deleted successfully!` });
});

// Create a new Post
router.post("/create", authHandler, async (req, res) => {
  const payload = req.body;

  // Validate request
  const validatePayload = createPostSchema(payload);
  const { error } = validatePayload;
  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  // await Post.create({
  //   title: "Test Post",
  //   content: "Test Content",
  //   status: "Pending",
  //   userId: 1
  // })

  // Save Post in the database
  const data = await Post.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    userId: req.body.userId,
  });

  res.status(200).send({ message: "Post created successfully...", data: data });
});

module.exports = router;
