import {
  createProfileService,
  getDoctorProfileService,
  updateDoctorProfileService,
  getDashboardService,
  getDoctorsService,
  getDoctorByIdService,
  changePasswordService,
} from "./doctor.service.js";
export const createProfile = async (req, res) => {
  try {
    const result = await createProfileService(req.user.id, req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const result = await getDoctorProfileService(req.user.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const result = await updateDoctorProfileService(req.user.id, req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getDashboard = async (req, res) => {
  try {
    const result = await getDashboardService(req.user.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getDoctors = async (req, res) => {
  try {
    const result = await getDoctorsService(req.query);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const getDoctorById = async (req, res) => {
  try {
    const result = await getDoctorByIdService(req.params.id);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await changePasswordService(
      req.user.id,
      currentPassword,
      newPassword,
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
