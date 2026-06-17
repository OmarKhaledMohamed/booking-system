import User from "../../Models/User.model.js";
import Booking from "../../Models/Booking.model.js";
import bcrypt from "bcryptjs";
import {
  updateUserSchema,
  changePasswordSchema,
} from "./user.validation.js";
export const getProfileService = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "role"],
  });

  return {
    success: true,
    statusCode: 200,
    data: user,
  };
};

export const updateProfileService = async (userId, data) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  await user.update(data);

  return {
    success: true,
    statusCode: 200,
    message: "Profile updated successfully",
    data: user,
  };
};

export const deleteProfileService = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  const activeBookings = await Booking.count({
    where: {
      userId,
      status: "confirmed",
    },
  });

  if (activeBookings > 0) {
    return {
      success: false,
      statusCode: 400,
      message: "You must cancel all your bookings before deleting your account",
    };
  }

  await user.destroy();

  return {
    success: true,
    statusCode: 200,
    message: "Profile deleted successfully",
  };
};
export const changePasswordService = async (
  userId,
  currentPassword,
  newPassword,
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (currentPassword === newPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "New password must be different from current password",
    };
  }

  if (!isMatch) {
    return {
      success: false,
      statusCode: 400,
      message: "Current password is incorrect",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
  };
};
