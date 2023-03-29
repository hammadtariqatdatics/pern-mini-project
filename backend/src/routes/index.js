const { Router } = require("express");
// const { authHandler } = require('../middleware/auth');
// const personRouter = require("./persons/person.controller");
const userRouter = require("./users/user.controller");
const postRouter = require("./posts/post.controller");

const router = Router();

// router.use("/persons", personRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
