import {
  createBookingService,
  getMyBookingsService,
  cancelBookingService,
} from "./booking.service.js";
export const createBooking = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const result = await createBookingService(req.user.id, appointmentId);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getMyBookings = async (req, res) => {
  try {
    const result = await getMyBookingsService(req.user.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const result = await cancelBookingService(req.user.id, req.params.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
