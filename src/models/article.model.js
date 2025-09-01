import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";

const Article = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM,
    },
    birth_date: {
      type: DataTypes.DATE,
    },
  },
  {}
);
