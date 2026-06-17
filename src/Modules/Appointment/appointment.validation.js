import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  date: Joi.date().required(),

  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required(),

  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required(),
});
