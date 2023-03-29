const Joi = require("joi");

const createPostSchema = (post) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(25).required("Title is required..."),
    content: Joi.string().required("Content is required..."),
    status: Joi.string()
      .valid("pending", "approved")
      .required("Status is required..."),
    userId: Joi.number().required("Foreign User Id is required..."),
  });

  return schema.validate(post);
};

module.exports = createPostSchema;
