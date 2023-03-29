const Joi = require("joi");

// For registeration
const createUserSchema = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(25).required("Name is required..."),
    email: Joi.string().email().required("Email is required..."),
    password: Joi.string().required("Password is required..."),
    role: Joi.string()
      .valid("normalUser", "adminUser")
      .required("Role is required..."),
  });

  return schema.validate(user);
};

// for login
const authUserSchema = (user) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required("Email is required..."),
    password: Joi.string().required("Password is required..."),
  });

  return schema.validate(user);
};

module.exports = { createUserSchema, authUserSchema };
