import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { authorization } from "../../Middleware/authorization.middleware.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { changePasswordSchema, updateUserSchema } from "./user.validation.js";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} from "./user.controller.js";

const router = Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get User Profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to perform this action
 */
/**
 * @swagger
 * /user/profile:
 *   patch:
 *     summary: Update User Profile
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Omar Khaled
 *               email:
 *                 type: string
 *                 example: omar@gmail.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to perform this action
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /user/profile:
 *   delete:
 *     summary: Delete User Account
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       400:
 *         description: You must cancel all your bookings before deleting your account
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to perform this action
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /user/change-password:
 *   patch:
 *     summary: Change User Password
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", auth, authorization("user"), getProfile);

router.patch("/profile", auth, authorization("user"), updateProfile);

router.delete("/profile", auth, authorization("user"), deleteProfile);

router.patch(
  "/profile",
  auth,
  authorization("user"),
  validation(updateUserSchema),
  updateProfile,
);
export default router;
