import {
  createAppointmentService,
  getMyAppointmentsService,
  getAvailableAppointmentsService,
  deleteAppointmentService,
} from "./appointment.service.js";
export const createAppointment = async (req, res) => {
  try {
    const result = await createAppointmentService(req.user.id, req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getMyAppointments = async (req, res) => {
  try {
    const result = await getMyAppointmentsService(req.user.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getAvailableAppointments = async (req, res) => {
  try {
    const result = await getAvailableAppointmentsService();

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const result = await deleteAppointmentService(req.user.id, req.params.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
