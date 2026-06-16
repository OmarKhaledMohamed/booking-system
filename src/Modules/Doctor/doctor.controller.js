import { createProfileService } from "./doctor.service.js";

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
