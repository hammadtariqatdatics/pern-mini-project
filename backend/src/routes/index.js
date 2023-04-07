const { Router } = require("express");
const { authHandler } = require("../middleware/auth");
const userRouter = require("./users/user.controller");
const postRouter = require("./posts/post.controller");
const acl = require("express-acl");

acl.config({
  filename: "nacl.json",
  baseUrl: "/api",
  defaultRole: "user",
  decodedObjectName: "user",
  roleSearchPath: "user.userRole",
  denyCallback: (res) => {
    return res.status(403).json({
      status: "Access Denied",
      success: false,
      message: "You are not authorized to access this resource",
    });
  },
});

const aclExcludedRoutes = [
  "/api/users/register",
  "/api/users/login",
  "/api/users/verify-otp",
  "/api/users/resend-otp",
];

const router = Router();

router.use(authHandler);
router.use(acl.authorize.unless({ path: aclExcludedRoutes }));
router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
