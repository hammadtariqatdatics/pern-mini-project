const acl = require("express-acl");

acl.config({
  filename: "nacl.json",
  baseUrl: "/api",
  // defaultRole: "user",
  decodedObjectName: "user",
  // roleSearchPath: "user.userRole",
  denyCallback: (res) => {
    return res.status(403).json({
      status: "Access Denied",
      success: false,
      message: "You are not authorized to access this resource",
    });
  },
});

module.exports = acl;
