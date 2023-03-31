const Joi = require("joi");

const createPostSchema = (post) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).max(25).required("Title is required..."),
    content: Joi.string().required("Content is required..."),
    createdDate: Joi.string().required("Date is required..."),
    status: Joi.string()
      .valid("pending", "approved")
      .required("Status is required..."),
  });

  return schema.validate(post);
};

module.exports = createPostSchema;
