const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../../db/models");
const { generateAuthToken } = require("../../utils/helpers");
const { emailHandler, authHandler } = require("../../middleware/auth");
const { User } = db;
const passport = require("passport");
const {
  userSMS,
  userSMSVerify,
  resendVerifySMS,
} = require("../../utils/user.sms");
const {
  validateAuthUserRequestHandler,
  validateUserRequestHandler,
} = require("../../middleware/validate");
const { Op } = db.Sequelize;

// Retrieve all Users
router.get("/", authHandler, async (req, res) => {
  const { pageSize, pageNumber, name } = req.query;
  const offset = (pageNumber - 1) * pageSize;
  const condition = name ? { name: { [Op.like]: `${name}` } } : null;
  try {
    const data = await User.findAll({
      include: ["posts"],
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
        .send({ message: "There is some error in getting Users data" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Retrieve a single User with id
router.get("/:id", authHandler, async (req, res) => {
  const { id } = req.params;
  const data = await User.findByPk(id, {
    include: ["posts"],
  });

  try {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({
        message: `Cannot find User with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Update a User with id
router.put("/:id", authHandler, async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete a User with id
router.delete("/:id", authHandler, async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Delete all Users
router.delete("/", authHandler, async (req, res) => {
  try {
    const nums = await User.destroy({
      where: {},
      truncate: false,
    });
    res
      .status(200)
      .send({ message: `${nums} Users were deleted successfully!` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create a new User
router.post(
  "/register",
  validateUserRequestHandler,
  emailHandler,
  async (req, res) => {
    try {
      const { name, email, phone, password, userRole } = req.body;
      // Save User in the database
      const data = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: bcrypt.hashSync(password, 8),
        userRole: userRole,
      });
      userSMS(phone);
      res
        .status(200)
        .send({ message: "User registered successfully...", data: data });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

// Authenticate a User
router.post(
  "/login",
  validateAuthUserRequestHandler,
  async (req, res, next) => {
    // Authenticate login request
    return passport.authenticate(
      "local",
      { session: false },
      (error, payload, info) => {
        if (error) {
          return next(error);
        }
        // console.log(payload);
        if (payload) {
          const response = {
            id: payload.id,
            email: payload.email,
            userRole: payload.userRole,
            token: generateAuthToken(
              payload.email,
              payload.id,
              payload.userRole
            ),
          };
          res.status(200).send({ success: true, data: response });
          return;
        } else {
          return res.status(400).send({ error: true, message: info });
        }
      }
    )(req, res, next);
  }
);

// verify OTP
router.post("/verify-otp", async (req, res) => {
  const { otp, phone } = req.body;

  try {
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });
    if (user && otp) {
      userSMSVerify(user.phone, otp);
      res.status(200).send({ message: "OTP verified successfully" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// resend OTP
router.post("/resend-otp", async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });
    if (user) {
      resendVerifySMS(user.phone);
      res.status(200).send({ message: "OTP resend successfully" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
