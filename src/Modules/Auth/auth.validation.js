import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required(),

  role: Joi.string().valid("user", "doctor").optional(),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),

  resetToken: Joi.string().required(),

  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required(),
});
export const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),

  verificationCode: Joi.string().required(),
});
