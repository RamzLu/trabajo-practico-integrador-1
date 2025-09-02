import { Article } from "../models/article.model.js";
import { ArticleTag } from "../models/articleTag.model.js";
import { Tag } from "../models/tag.model.js";
import { User } from "../models/user.model.js";

export const getAllArticleTag = async (req, res) => {
  try {
    const article_tag = await ArticleTag.findAll({
      attributes: {
        exclude: ["article_id", "tag_id"],
      },
      include: [
        {
          model: Tag,
          as: "tags",
        },
        {
          model: Article,
          as: "articles",
          attributes: { exclude: ["user_id"] },
          include: [{ model: User, as: "author" }],
        },
      ],
    });
    return res.status(200).json(article_tag);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const getlabelTaskById = async (req, res) => {
  try {
    const article_tag = await ArticleTag.findByPk(req.params.id, {
      attributes: {
        exclude: ["article_id", "tag_id"],
      },
      include: [
        {
          model: Article,
          as: "articles",
          attributes: { exclude: ["user_id"] },
          include: [{ model: User, as: "author" }],
        },
        {
          model: Tag,
          as: "tags",
        },
      ],
    });
    if (article_tag) {
      return res.status(200).json(article_tag);
    } else {
      return res.status(404).json({
        error: "relation not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const createArticleTag = async (req, res) => {
  try {
    const newRelation = await ArticleTag.create(req.body);
    const article_tag = await ArticleTag.findByPk(newRelation.id, {
      attributes: {
        exclude: ["article_id", "tag_id"],
      },
      include: [
        {
          model: Article,
          as: "articles",
          attributes: { exclude: ["user_id"] },
          include: [{ model: User, as: "author" }],
        },
        {
          model: Tag,
          as: "tags",
        },
      ],
    });
    return res.status(201).json({
      msg: "The new relationship has been successfully created.",
      article_tag: article_tag,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const updateArticleTag = async (req, res) => {
  try {
    const [update] = await ArticleTag.findByPk(req.params.id);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};
