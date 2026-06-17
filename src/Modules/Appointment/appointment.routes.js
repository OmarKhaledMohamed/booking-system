import { Router } from "express";

import { auth } from "../../Middleware/auth.middleware.js";
import { authorization } from "../../Middleware/authorization.middleware.js";
import { validation } from "../../Middleware/validation.middleware.js";

import { createAppointmentSchema } from "./appointment.validation.js";
import {
  createAppointment,
  getMyAppointments,
  getAvailableAppointments,
  deleteAppointment,
} from "./appointment.controller.js";
const router = Router();

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create Appointment
 *     tags:
 *       - Appointment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2026-06-25"
 *               startTime:
 *                 type: string
 *                 example: "14:00:00"
 *               endTime:
 *                 type: string
 *                 example: "14:30:00"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */
/**
 * @swagger
 * /appointments/my:
 *   get:
 *     summary: Get My Appointments
 *     tags:
 *       - Appointment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctor appointments
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Doctor profile not found
 */
/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get Available Appointments
 *     tags:
 *       - Appointment
 *     responses:
 *       200:
 *         description: Available appointments
 */
/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete Appointment
 *     tags:
 *       - Appointment
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
 *         description: Appointment deleted successfully
 */
router.delete("/:id", auth, authorization("doctor"), deleteAppointment);
router.post(
  "/",
  auth,
  authorization("doctor"),
  validation(createAppointmentSchema),
  createAppointment,
);
router.get("/", getAvailableAppointments);
router.get("/my", auth, authorization("doctor"), getMyAppointments);

export default router;
