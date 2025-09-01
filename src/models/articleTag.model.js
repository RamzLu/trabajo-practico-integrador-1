import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";

const article_tag = sequelize.define(
  "article_tag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { createdAt: "created_at", updatedAt: "update_at" }
);
