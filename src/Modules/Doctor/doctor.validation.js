import Joi from "joi";

export const createDoctorProfileSchema = Joi.object({
  specialization: Joi.string().min(2).max(100).required(),

  experienceYears: Joi.number().integer().min(0).max(60).required(),

  bio: Joi.string().min(10).max(1000).required(),

  image: Joi.string().allow("", null),

  gender: Joi.string().valid("male", "female").required(),
});
export const updateDoctorProfileSchema = Joi.object({
  specialization: Joi.string().min(2).max(100),

  experienceYears: Joi.number().integer().min(0).max(60),

  bio: Joi.string().min(10).max(1000),

  image: Joi.string().allow("", null),

  gender: Joi.string().valid("male", "female"),
}).min(1);
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),

  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/)
    .required(),
});
