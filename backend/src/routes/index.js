const { Router } = require("express");
const { authHandler } = require("../middleware/auth");
const userRouter = require("./users/user.controller");
const postRouter = require("./posts/post.controller");
const acl = require("../middleware/roles");

const aclExcludedRoutes = [
  "/api/users/register",
  "/api/users/login",
  "/api/users/verify-otp",
  "/api/users/resend-otp",
];

const router = Router();

router.use(acl.authorize);
router.use(acl.authorize.unless({ path: aclExcludedRoutes }));
router.use("/users", userRouter);
router.use("/posts", authHandler, postRouter);


module.exports = router;
