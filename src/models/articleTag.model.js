import { DataTypes } from "sequelize";
import { sequelize } from "../config/batabase.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";

export const ArticleTag = sequelize.define(
  "ArticleTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { createdAt: "created_at", updatedAt: "update_at" }
);

Article.belongsToMany(Tag, {
  through: ArticleTag,
  foreignKey: "article_id",
  as: "tag",
  onDelete: "CASCADE",
});

Tag.belongsToMany(Article, {
  through: ArticleTag,
  foreignKey: "tag_id",
  as: "article",
});

ArticleTag.belongsTo(Article, { foreignKey: "article_id", as: "article" });
ArticleTag.belongsTo(Tag, { foreignKey: "tag_id", as: "tag" });
