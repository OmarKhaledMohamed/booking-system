import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required(),
  name: Joi.string().required(),

  email: Joi.string()
    .email()
    .pattern(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/,
    )
    .required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required(),

  role: Joi.string().valid("user", "doctor").optional(),
});
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/,
    )
    .required(),

  password: Joi.string().required(),
});
export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/,
    )
    .required(),
});
export const resetPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/,
    )
    .required(),

  resetToken: Joi.string().required(),

  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required(),
});
export const verifyEmailSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/,
    )
    .required(),

  verificationCode: Joi.string().required(),
});
