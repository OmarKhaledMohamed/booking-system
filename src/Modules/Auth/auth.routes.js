import { Router } from "express";
import {
  register,
  login,
  profile,
  dashboard,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from "./auth.controller.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { authorization } from "../../Middleware/authorization.middleware.js";
import { validation } from "../../Middleware/validation.middleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "./auth.validation.js";
import { loginLimiter } from "../../Middleware/rateLimit.middleware.js";
const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Omar
 *               email:
 *                 type: string
 *                 example: omar@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: omar@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get Current User
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: omar@gmail.com
 *     responses:
 *       200:
 *         description: Reset token generated successfully
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: omar@gmail.com
 *               resetToken:
 *                 type: string
 *                 example: "345931"
 *               newPassword:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired reset token
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify Email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: omar@gmail.com
 *               verificationCode:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid verification code
 *       404:
 *         description: User not found
 */
router.post("/register", validation(registerSchema), register);
router.post("/login", validation(loginSchema), loginLimiter, login);
router.get("/profile", auth, profile);
router.get("/dashboard", auth, authorization("admin"), dashboard);
router.post(
  "/forgot-password",
  validation(forgotPasswordSchema),
  forgotPassword,
);
router.post("/reset-password", validation(resetPasswordSchema), resetPassword);
router.post("/verify-email", validation(verifyEmailSchema), verifyEmail);
export default router;
