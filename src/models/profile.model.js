import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define(
  "Profile",
  {
    // Model attributes are defined here
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
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

Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
