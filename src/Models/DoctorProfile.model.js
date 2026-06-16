import { DataTypes } from "sequelize";
import sequelize from "../DB/db.js";

const DoctorProfile = sequelize.define("DoctorProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },

  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  experienceYears: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  bio: {
    type: DataTypes.TEXT,
  },
});

export default DoctorProfile;
