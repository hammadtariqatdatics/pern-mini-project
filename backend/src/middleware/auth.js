const db = require("../../db/models");
const { User } = db;
const { verifyAuthToken } = require("../utils/helpers");

// middleware for checking token
const authHandler = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(400)
      .send({ message: "Access denied, authentication token is not provided" });
  }

  try {
    const { token } = req.headers;
    const isTokenValid = verifyAuthToken(token);
    if (isTokenValid) {
      req.user = isTokenValid;
      next();
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// middleware for checking email
const emailHandler = async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailCheck) {
      res.status(400).send({ message: "Email already exist... Try new one." });
      return;
    }
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { authHandler, emailHandler };
