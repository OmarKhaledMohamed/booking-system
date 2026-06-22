import dotenv from "dotenv";
import sequelize from "./DB/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import authRouter from "./Modules/Auth/auth.routes.js";
import "./DB/associations.js";
import doctorRouter from "./Modules/Doctor/doctor.routes.js";
import appointmentRouter from "./Modules/Appointment/appointment.routes.js";
import bookingRouter from "./Modules/Booking/booking.routes.js";
import userRouter from "./Modules/User/user.routes.js";
import cors from "cors";
export default async function bootstrap(app, express) {
  dotenv.config();
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/auth", authRouter);
  app.use("/doctor", doctorRouter);
  app.use("/appointments", appointmentRouter);
  app.use("/bookings", bookingRouter);
  app.use("/user", userRouter);
  app.get("/", (req, res) => {
    res.send("Booking System API");
  });
  try {
    await sequelize.authenticate();
    console.log("Database Connected");

    await sequelize.sync({ alter: true });

    console.log("Tables Synced");
  } catch (error) {
    console.log(error);
  }
}
