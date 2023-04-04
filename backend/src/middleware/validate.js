const createPostSchema = require("../routes/posts/validationSchema");
const {
  createUserSchema,
  authUserSchema,
} = require("../routes/users/validationSchema");

const validateUserRequestHandler = (req, res, next) => {
  const payload = req.body;
  // Validate request
  const validatePayload = createUserSchema(payload);
  const { error } = validatePayload;
  if (error) {
    return res.status(400).send({ message: error.message });
  } else {
    next();
  }
};

const validatePostRequestHandler = (req, res, next) => {
  const payload = req.body;
  // Validate request
  const validatePayload = createPostSchema(payload);
  const { error } = validatePayload;
  if (error) {
    return res.status(400).send({ message: error.message });
  } else {
    next();
  }
};

const validateAuthUserRequestHandler = (req, res, next) => {
  const payload = req.body;
  // Validate request
  const validatePayload = authUserSchema(payload);
  const { error } = validatePayload;
  if (error) {
    return res.status(400).send({ message: error.message });
  } else {
    next();
  }
};

module.exports = {
  validateAuthUserRequestHandler,
  validatePostRequestHandler,
  validateUserRequestHandler,
};
