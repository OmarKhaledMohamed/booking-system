import Joi from "joi";

export const createBookingSchema = Joi.object({
  appointmentId: Joi.number().required(),
});
