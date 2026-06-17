import {
  getProfileService,
  updateProfileService,
  changePasswordService,
} from "./user.service.js";

export const getProfile = async (req, res) => {
  try {
    const result = await getProfileService(req.user.id);

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
    const result = await updateProfileService(req.user.id, req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const result = await deleteProfileService(req.user.id);

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
