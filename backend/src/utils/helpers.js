const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const generateAuthToken = (email, id, userRole) => {
  const loggedInUser = {
    id: id,
    email: email,
    userRole: userRole,
  };
  return jwt.sign(loggedInUser, secretKey);
};

const verifyAuthToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
