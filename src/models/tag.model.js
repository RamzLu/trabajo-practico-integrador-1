import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";

export const Tag = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { createdAt: "created_at", updatedAt: "update_at" }
);
