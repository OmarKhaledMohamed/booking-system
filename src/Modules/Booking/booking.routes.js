import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { authorization } from "../../Middleware/authorization.middleware.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { createBookingSchema } from "./booking.validation.js";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "./booking.controller.js";

const router = Router();

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Book Appointment
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 */
/**
 * @swagger
 * /bookings/my:
 *   get:
 *     summary: Get My Bookings
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User bookings
 */
/**
 * @swagger
 * /bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel Booking
 *     tags:
 *       - Booking
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
 *         description: Booking cancelled successfully
 */
router.post(
  "/",
  auth,
  authorization("user"),
  validation(createBookingSchema),
  createBooking,
);
router.get("/my", auth, authorization("user"), getMyBookings);
router.patch("/:id/cancel", auth, authorization("user"), cancelBooking);

export default router;
