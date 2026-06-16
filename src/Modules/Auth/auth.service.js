import User from "../../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  return {
    success: true,
    statusCode: 201,
    message: "User created successfully",
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
