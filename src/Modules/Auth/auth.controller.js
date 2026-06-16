import { registerService, loginService } from "./auth.service.js";

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
  return res.status(200).json({
    success: true,
    statusCode: 200,
    user: req.user,
  });
};
export const dashboard = async (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome Admin",
  });
};
