import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .normalize()
    .max(100)
    .email()
    .trim()
    .normalize()
    .required(),
  password: Joi.string().trim().normalize().max(255).required(),
});

const registerSchema = Joi.object({
  email: Joi.string().trim().normalize().max(100).email().required(),
  name: Joi.string().trim().normalize().max(100).required(),
  password: Joi.string().trim().normalize().max(255).required(),
  roleCode: Joi.string().trim().normalize().max(255).required(),
});

export { loginSchema, registerSchema };
