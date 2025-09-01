import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";

const Tag = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {}
);
