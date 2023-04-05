const acl = require("express-acl");

acl.config({
  filename: "nacl.json",
  baseUrl: "/api",
  // defaultRole: "user",
  decodedObjectName: "user",
  roleSearchPath: "user.role",
  denyCallback: (res) => {
    console.log(res);
    return res.status(403).json({
      status: "Access Denied",
      success: false,
      message: "You are not authorized to access this resource",
    });
  },
});

module.exports = acl;
