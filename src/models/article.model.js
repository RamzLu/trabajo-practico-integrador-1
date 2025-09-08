import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";
import { User } from "./user.model.js";

export const Article = sequelize.define(
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
      values: ["published", "archived"],
      defaultValue: "published",
    },
    birth_date: {
      type: DataTypes.DATE,
    },
  },
  { createdAt: "created_at", updatedAt: "update_at" }
);

Article.belongsTo(User, { foreignKey: "user_id", as: "author" });
User.hasMany(Article, { foreignKey: "user_id", as: "articles" });
