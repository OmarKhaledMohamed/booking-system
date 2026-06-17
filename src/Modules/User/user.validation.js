import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),

  email: Joi.string().email(),
}).min(1);

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .required(),
});
