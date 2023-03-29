const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../../db/models");
const { createUserSchema, authUserSchema } = require("./validationSchema");
const { generateAuthToken } = require("../../utils/helpers");
const { emailHandler, authHandler } = require("../../middleware/auth");
const { User } = db;
const passport = require("passport");

// Retrieve all Users
router.get("/", authHandler, async (req, res) => {
  const data = await User.findAll();
  if (data) {
    res.status(200).send(data);
  } else {
    res
      .status(400)
      .send({ message: "There is some error in getting Users data" });
  }
});

// Retrieve a single User with id
router.get("/:id", authHandler, async (req, res) => {
  const id = req.params.id;

  const data = await User.findByPk(id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(400).send({
      message: `Cannot find User with id=${id}.`,
    });
  }
});

// Update a User with id
router.put("/:id", authHandler, async (req, res) => {
  const id = req.params.id;
  const num = await User.update(req.body, {
    where: { id: id },
  });

  if (num == 1) {
    res.status(200).send({
      message: "User was updated successfully.",
    });
  } else {
    res.status(400).send({
      message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
    });
  }
});

// Delete a User with id
router.delete("/:id", authHandler, async (req, res) => {
  const id = req.params.id;

  const num = await User.destroy({
    where: { id: id },
  });
  if (num == 1) {
    res.status(200).send({
      message: "User was deleted successfully!",
    });
  } else {
    res.status(400).send({
      message: `Cannot delete User with id=${id}. Maybe User was not found!`,
    });
  }
});

// Delete all Users
router.delete("/", authHandler, async (req, res) => {
  const nums = await User.destroy({
    where: {},
    truncate: false,
  });
  res.status(200).send({ message: `${nums} Users were deleted successfully!` });
});

// Create a new User
router.post("/register", emailHandler, async (req, res) => {
  const payload = req.body;

  // Validate request
  const validatePayload = createUserSchema(payload);
  const { error } = validatePayload;
  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  // Save User in the database
  const data = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });
  res
    .status(200)
    .send({ message: "User registered successfully...", data: data });
});

// Authenticate a User
router.post("/login", async (req, res, next) => {
  const payload = req.body;

  // Validate request
  const validatePayload = authUserSchema(payload);
  const { error } = validatePayload;

  if (error) {
    res.status(400).send({ message: error.message });
    return;
  }

  // Authenticate login request
  return passport.authenticate(
    "local",
    { session: false },
    (error, payload, info) => {
      const { id, email } = payload;
      if (error) {
        return next(error);
      }

      if (payload) {
        const response = {
          id: id,
          email: email,
          token: generateAuthToken({ id, email }),
        };
        return res.status(200).send({ success: true, data: response });
      }
      return res.status(400).send({ error: true, message: info });
    }
  )(req, res, next);
});

module.exports = router;
