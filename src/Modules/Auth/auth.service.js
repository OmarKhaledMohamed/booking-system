import User from "../../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../../Utils/sendEmail.js";

export const registerService = async (data) => {
  const { name, email, password, role } = data;

  const isExist = await User.findOne({
    where: { email },
  });

  if (isExist) {
    return {
      success: false,
      statusCode: 409,
      message: "Email already exists",
    };
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  user.verificationCode = verificationCode;

  await user.save();
  await sendEmail(
    user.email,
    "Booking System - Email Verification",
    `Your verification code is: ${verificationCode}`,
  );
  return {
    success: true,
    statusCode: 201,
    message: "Account created successfully. Please verify your email.",
    verificationCode,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
export const loginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      statusCode: 401,
      message: "Email does not exist",
    };
  }
  if (!user.isVerified) {
    return {
      success: false,
      statusCode: 403,
      message: "Please verify your email first",
    };
  }

  const match = bcrypt.compareSync(password, user.password);

  if (!match) {
    return {
      success: false,
      statusCode: 401,
      message: "Incorrect password",
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: {
      token,
      role: user.role,
    },
  };
};
export const forgotPasswordService = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  const resetToken = crypto.randomInt(100000, 999999).toString();

  user.resetToken = resetToken;

  user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

  await user.save();
  await sendEmail(
    user.email,
    "Booking System - Password Reset",
    `Your reset code is: ${resetToken}`,
  );

  return {
    success: true,
    statusCode: 200,
    message: "Reset token sent to your email",
    resetToken,
  };
};
export const resetPasswordService = async (email, resetToken, newPassword) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  if (user.resetToken !== resetToken) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid reset token",
    };
  }

  if (new Date() > user.resetTokenExpires) {
    return {
      success: false,
      statusCode: 400,
      message: "Reset token has expired",
    };
  }
  const isSamePassword = await bcrypt.compare(newPassword, user.password);

  if (isSamePassword) {
    return {
      success: false,
      statusCode: 400,
      message: "New password must be different from current password",
    };
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  user.resetToken = null;
  user.resetTokenExpires = null;

  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: "Password reset successfully",
  };
};
export const verifyEmailService = async (email, verificationCode) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  if (user.isVerified) {
    return {
      success: false,
      statusCode: 400,
      message: "Email already verified",
    };
  }

  if (user.verificationCode !== verificationCode) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid verification code",
    };
  }

  user.isVerified = true;

  user.verificationCode = null;

  await user.save();

  return {
    success: true,
    statusCode: 200,
    message: "Email verified successfully",
  };
};
