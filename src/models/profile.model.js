import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define(
  "Profile",
  {
    // Model attributes are defined here
    first_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    avatar_url: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "update_at",
  }
);
