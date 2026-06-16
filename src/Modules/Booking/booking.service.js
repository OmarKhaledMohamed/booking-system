import Booking from "../../Models/Booking.model.js";
import Appointment from "../../Models/Appointment.model.js";

export const createBookingService = async (userId, appointmentId) => {
  // 1. Check appointment exists
  const appointment = await Appointment.findByPk(appointmentId);

  if (!appointment) {
    return {
      success: false,
      statusCode: 404,
      message: "Appointment not found",
    };
  }

  // 2. Check appointment available
  if (appointment.status !== "available") {
    return {
      success: false,
      statusCode: 409,
      message: "Appointment already booked",
    };
  }

  // 3. Check user didn't book before
  const existingBooking = await Booking.findOne({
    where: {
      userId,
      appointmentId,
    },
  });

  if (existingBooking) {
    if (existingBooking.status === "confirmed") {
      return {
        success: false,
        statusCode: 409,
        message: "You already booked this appointment",
      };
    }

    if (existingBooking.status === "cancelled") {
      existingBooking.status = "confirmed";

      await existingBooking.save();

      appointment.status = "booked";

      await appointment.save();

      return {
        success: true,
        statusCode: 200,
        message: "Booking restored successfully",
        data: existingBooking,
      };
    }
  }
  // 4. Create booking
  const booking = await Booking.create({
    userId,
    appointmentId,
  });

  // 5. Update appointment status
  appointment.status = "booked";

  await appointment.save();

  return {
    success: true,
    statusCode: 201,
    message: "Appointment booked successfully",
    data: booking,
  };
};
export const getMyBookingsService = async (userId) => {
  const bookings = await Booking.findAll({
    where: {
      userId,
    },
    order: [["createdAt", "DESC"]],
  });

  return {
    success: true,
    statusCode: 200,
    data: bookings,
  };
};
export const cancelBookingService = async (userId, bookingId) => {
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId,
    },
  });

  if (!booking) {
    return {
      success: false,
      statusCode: 404,
      message: "Booking not found",
    };
  }

  if (booking.status === "cancelled") {
    return {
      success: false,
      statusCode: 400,
      message: "Booking already cancelled",
    };
  }

  const appointment = await Appointment.findByPk(booking.appointmentId);

  booking.status = "cancelled";

  await booking.save();

  appointment.status = "available";

  await appointment.save();

  return {
    success: true,
    statusCode: 200,
    message: "Booking cancelled successfully",
  };
};
export const rescheduleBookingService = async (
  userId,
  bookingId,
  newAppointmentId,
) => {
  const booking = await Booking.findOne({
    where: {
      id: bookingId,
      userId,
    },
  });

  if (!booking) {
    return {
      success: false,
      statusCode: 404,
      message: "Booking not found",
    };
  }

  const newAppointment = await Appointment.findByPk(newAppointmentId);

  if (!newAppointment) {
    return {
      success: false,
      statusCode: 404,
      message: "Appointment not found",
    };
  }

  if (newAppointment.status !== "available") {
    return {
      success: false,
      statusCode: 409,
      message: "Appointment is not available",
    };
  }

  if (booking.appointmentId === Number(newAppointmentId)) {
    return {
      success: false,
      statusCode: 400,
      message: "Booking already assigned to this appointment",
    };
  }

  const oldAppointment = await Appointment.findByPk(booking.appointmentId);

  oldAppointment.status = "available";
  await oldAppointment.save();

  newAppointment.status = "booked";
  await newAppointment.save();

  booking.appointmentId = newAppointment.id;
  booking.status = "confirmed";

  await booking.save();

  return {
    success: true,
    statusCode: 200,
    message: "Booking rescheduled successfully",
    data: booking,
  };
};
