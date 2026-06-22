import {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
  verifyEmailService,
} from "./auth.service.js";
import User from "../../Models/User.model.js";

export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const profile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "name", "email", "role"],
  });

  return res.status(200).json({
    success: true,
    statusCode: 200,
    user,
  });
};
export const dashboard = async (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome Admin",
  });
};
export const forgotPassword = async (req, res) => {
  try {
    const result = await forgotPasswordService(req.body.email);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    const result = await resetPasswordService(email, resetToken, newPassword);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const result = await verifyEmailService(email, verificationCode);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
