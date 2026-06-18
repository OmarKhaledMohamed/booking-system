import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    statusCode: 429,
    message: "Too many login attempts, please try again after 15 minutes",
  },
});
