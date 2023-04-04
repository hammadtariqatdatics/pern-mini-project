const express = require("express");
const router = express.Router();
const db = require("../../../db/models");
const { authHandler } = require("../../middleware/auth");
const { validatePostRequestHandler } = require("../../middleware/validate");
const { Post } = db;
const { Op } = db.Sequelize;

// Retrieve all Posts
router.get("/", authHandler, async (req, res) => {
  const { pageSize, pageNumber, title } = req.query;
  const offset = (pageNumber - 1) * pageSize;
  const condition = title ? { title: { [Op.like]: `${title}` } } : null;
  try {
    const data = await Post.findAll({
      include: ["users"],
      limit: pageSize ? pageSize : null,
      offset: offset ? offset : null,
      order: [["id", "ASC"]],
      where: condition,
    });

    if (data) {
      res.status(200).send(data);
    } else {
      res
        .status(400)
        .send({ message: "There is some error in getting Posts data" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Retrieve a single Post with id
router.get("/:id", authHandler, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findByPk(id, {
      include: ["users"],
    });
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({
        message: `Cannot find Post with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Update a Post with id
router.put("/:id", authHandler, async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete a Post with id
router.delete("/:id", authHandler, async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete all Posts
router.delete("/", authHandler, async (req, res) => {
  try {
    const nums = await Post.destroy({
      where: {},
      truncate: false,
    });
    res
      .status(200)
      .send({ message: `${nums} Posts were deleted successfully!` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create a new Post
router.post(
  "/create",
  authHandler,
  validatePostRequestHandler,
  async (req, res) => {
    console.log(req.user);
    try {
      const { title, content, createdDate, status } = req.body;
      // Save Post in the database
      const data = await Post.create({
        title: title,
        content: content,
        createdDate: createdDate,
        status: status,
        UserId: req.user.id,
      });
      res
        .status(200)
        .send({ message: "Post created successfully...", data: data });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

module.exports = router;
