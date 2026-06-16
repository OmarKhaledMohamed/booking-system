import User from "../Models/User.model.js";
import DoctorProfile from "../Models/DoctorProfile.model.js";
import Appointment from "../Models/Appointment.model.js";
import Booking from "../Models/Booking.model.js";

User.hasOne(DoctorProfile, {
  foreignKey: "userId",
});

DoctorProfile.belongsTo(User, {
  foreignKey: "userId",
});

DoctorProfile.hasMany(Appointment, {
  foreignKey: "doctorId",
});

Appointment.belongsTo(DoctorProfile, {
  foreignKey: "doctorId",
});
User.hasMany(Booking, {
  foreignKey: "userId",
});

Booking.belongsTo(User, {
  foreignKey: "userId",
});
Appointment.hasMany(Booking, {
  foreignKey: "appointmentId",
});

Booking.belongsTo(Appointment, {
  foreignKey: "appointmentId",
});
