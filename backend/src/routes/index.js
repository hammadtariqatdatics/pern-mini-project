const { Router } = require("express");
// const { authHandler } = require('../middleware/auth');
const userRouter = require("./users/user.controller");
const postRouter = require("./posts/post.controller");

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
