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

const refineUserData = (userData) => {
  const payload = {};
  payload.name = userData.name;
  payload.email = userData.email;
  payload.phone = userData.phone;
  payload.userRole = userData.userRole;
  return payload;
};

const refinePostData = (postData) => {
  const payload = {};
  payload.title = postData.title;
  payload.content = postData.content;
  payload.createdDate = postData.createdDate;
  payload.status = postData.status;
  payload.userName = postData.users.name;
  payload.userEmail = postData.users.email;
  return payload;
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
  refineUserData,
  refinePostData,
};
