const { Router } = require("express");
// const { authHandler } = require('../middleware/auth');
const userRouter = require("./users/user.controller");
const postRouter = require("./posts/post.controller");
const acl = require("../middleware/roles");

const router = Router();

router.use(acl.authorize);
router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
