import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    usermame: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);
