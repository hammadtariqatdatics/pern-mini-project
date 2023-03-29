require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const generateAuthToken = ({ id, email }) => jwt.sign({ id, email }, secretKey);

const verifyAuthToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
