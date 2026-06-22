import DoctorProfile from "../../Models/DoctorProfile.model.js";
import Appointment from "../../Models/Appointment.model.js";
import User from "../../Models/User.model.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
export const createProfileService = async (userId, profileData) => {
  const { specialization, experienceYears, bio, gender } = profileData;

  const isExist = await DoctorProfile.findOne({
    where: { userId },
  });

  if (isExist) {
    return {
      success: false,
      statusCode: 409,
      message: "Profile already exists",
    };
  }

  const profile = await DoctorProfile.create({
    userId,
    specialization,
    experienceYears,
    bio,
    gender,
  });

  return {
    success: true,
    statusCode: 201,
    message: "Profile created successfully",
    data: profile,
  };
};

export const getDoctorProfileService = async (userId) => {
  const profile = await DoctorProfile.findOne({
    where: {
      userId,
    },
  });

  if (!profile) {
    return {
      success: false,
      statusCode: 404,
      message: "Doctor profile not found",
    };
  }

  return {
    success: true,
    statusCode: 200,
    data: profile,
  };
};
export const updateDoctorProfileService = async (userId, profileData) => {
  const profile = await DoctorProfile.findOne({
    where: {
      userId,
    },
  });

  if (!profile) {
    return {
      success: false,
      statusCode: 404,
      message: "Doctor profile not found",
    };
  }

  await profile.update(profileData);

  return {
    success: true,
    statusCode: 200,
    message: "Profile updated successfully",
    data: profile,
  };
};
export const getDashboardService = async (userId) => {
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

  const totalAppointments = await Appointment.count({
    where: {
      doctorId: doctor.id,
    },
  });

  const availableAppointments = await Appointment.count({
    where: {
      doctorId: doctor.id,
      status: "available",
    },
  });

  const bookedAppointments = await Appointment.count({
    where: {
      doctorId: doctor.id,
      status: "booked",
    },
  });

  return {
    success: true,
    statusCode: 200,
    data: {
      totalAppointments,
      availableAppointments,
      bookedAppointments,
    },
  };
};
export const getDoctorsService = async (query) => {
  const { specialization, name, page = 1, limit = 10 } = query;

  const doctorWhere = {};
  const userWhere = {};

  if (specialization) {
    doctorWhere.specialization = specialization;
  }

  if (name) {
    userWhere.name = {
      [Op.like]: `%${name}%`,
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await DoctorProfile.findAndCountAll({
    where: doctorWhere,
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
        where: userWhere,
      },
    ],
    limit: Number(limit),
    offset: Number(offset),
  });

  return {
    success: true,
    statusCode: 200,
    data: rows,
    pagination: {
      total: count,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(count / limit),
    },
  };
};
export const getDoctorByIdService = async (doctorId) => {
  const doctor = await DoctorProfile.findByPk(doctorId, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
  });

  if (!doctor) {
    return {
      success: false,
      statusCode: 404,
      message: "Doctor not found",
    };
  }

  return {
    success: true,
    statusCode: 200,
    data: doctor,
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
      message: "Doctor not found",
    };
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return {
      success: false,
      statusCode: 400,
      message: "Current password is incorrect",
    };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "New password must be different from current password",
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
