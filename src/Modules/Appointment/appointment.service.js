import Appointment from "../../Models/Appointment.model.js";
import DoctorProfile from "../../Models/DoctorProfile.model.js";
import { Op } from "sequelize";

export const createAppointmentService = async (userId, appointmentData) => {
  const { date, startTime, endTime } = appointmentData;
  const now = new Date();

  const appointmentStart = new Date(`${date}T${startTime}`);

  if (appointmentStart <= now) {
    return {
      success: false,
      statusCode: 400,
      message: "Appointment must be scheduled in the future",
    };
  }

  const doctor = await DoctorProfile.findOne({
    where: { userId },
  });

  if (!doctor) {
    return {
      success: false,
      statusCode: 404,
      message: "Doctor profile not found",
    };
  }

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  if (start >= end) {
    return {
      success: false,
      statusCode: 400,
      message: "End time must be after start time",
    };
  }
  const conflictAppointment = await Appointment.findOne({
    where: {
      doctorId: doctor.id,
      date,
      startTime: {
        [Op.lt]: endTime,
      },
      endTime: {
        [Op.gt]: startTime,
      },
    },
  });

  if (conflictAppointment) {
    return {
      success: false,
      statusCode: 409,
      message: "Appointment time conflicts with existing appointment",
    };
  }

  const appointment = await Appointment.create({
    doctorId: doctor.id,
    date,
    startTime,
    endTime,
  });

  return {
    success: true,
    statusCode: 201,
    message: "Appointment created successfully",
    data: appointment,
  };
};
export const getMyAppointmentsService = async (userId) => {
  const doctor = await DoctorProfile.findOne({
    where: { userId },
  });

  if (!doctor) {
    return {
      success: false,
      statusCode: 404,
      message: "Doctor profile not found",
    };
  }

  const appointments = await Appointment.findAll({
    where: {
      doctorId: doctor.id,
    },
    order: [
      ["date", "ASC"],
      ["startTime", "ASC"],
    ],
  });

  return {
    success: true,
    statusCode: 200,
    data: appointments,
  };
};
export const getAvailableAppointmentsService = async () => {
  const appointments = await Appointment.findAll({
    where: {
      status: "available",
    },
    order: [
      ["date", "ASC"],
      ["startTime", "ASC"],
    ],
  });

  return {
    success: true,
    statusCode: 200,
    data: appointments,
  };
};
