import DoctorProfile from "../../Models/DoctorProfile.model.js";

export const createProfileService = async (userId, profileData) => {
  const { specialization, experienceYears, bio } = profileData;

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
  });

  return {
    success: true,
    statusCode: 201,
    message: "Profile created successfully",
    data: profile,
  };
};
