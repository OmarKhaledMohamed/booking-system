import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { authorization } from "../../Middleware/authorization.middleware.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { changePasswordSchema } from "./doctor.validation.js";
import {
  createProfile,
  getProfile,
  updateProfile,
  getDashboard,
  getDoctors,
  getDoctorById,
  changePassword,
} from "./doctor.controller.js";
const router = Router();
/**
 * @swagger
 * /doctor/profile:
 *   post:
 *     summary: Create Doctor Profile
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialization:
 *                 type: Dentist
 *               experienceYears:
 *                 type: 10
 *               bio:
 *                 type: xperienced Dentist
 *                 image:
 *                    type:https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
/**
 * @swagger
 * /doctor/profile:
 *   get:
 *     summary: Get Doctor Profile
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor profile
 */
/**
 * @swagger
 * /doctor/profile:
 *   patch:
 *     summary: Update Doctor Profile
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialization:
 *                 type: Dentist
 *               experienceYears:
 *                 type: 10
 *               bio:
 *                 type: xperienced Dentist
 *                 image:
 *                    type:https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
/**
 * @swagger
 * /doctor/dashboard:
 *   get:
 *     summary: Doctor Dashboard
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
/**
 * @swagger
 * /doctor:
 *   get:
 *     summary: Get All Doctors
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter doctors by specialization
 *
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Search doctors by name
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of doctors per page
 *
 *     responses:
 *       200:
 *         description: List of doctors retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to perform this action
 */
/**
 * @swagger
 * /doctor/{id}:
 *   get:
 *     summary: Get Doctor By Id
 *     tags:
 *       - Doctor
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *       404:
 *         description: Doctor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You are not allowed to perform this action
 */
/**
 * @swagger
 * /doctor/change-password:
 *   patch:
 *     summary: Change Doctor Password
 *     tags:
 *       - Doctor
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
router.post("/profile", auth, authorization("doctor"), createProfile);
router.get("/profile", auth, authorization("doctor"), getProfile);
router.patch("/profile", auth, authorization("doctor"), updateProfile);
router.get("/dashboard", auth, authorization("doctor"), getDashboard);
router.get("/", auth, authorization("user"), getDoctors);
router.patch(
  "/change-password",
  auth,
  authorization("doctor"),
  validation(changePasswordSchema),
  changePassword,
);
router.get("/:id", auth, authorization("user"), getDoctorById);
export default router;
