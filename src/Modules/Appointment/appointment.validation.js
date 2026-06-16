import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  date: Joi.date().required(),

  startTime: Joi.string().required(),

  endTime: Joi.string().required(),
});
