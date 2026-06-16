import { Router } from "express";
import { createProfile } from "./doctor.controller.js";
import { auth } from "../../Middleware/auth.middleware.js";
import { authorization } from "../../Middleware/authorization.middleware.js";

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
 *                 type: string
 *               experienceYears:
 *                 type: integer
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 */
router.post("/profile", auth, authorization("doctor"), createProfile);

export default router;
