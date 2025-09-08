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
          as: "tag",
        },
        {
          model: Article,
          as: "article",
          attributes: { exclude: ["article_tag"] },
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
    console.log(error.mesagge);
  }
};

export const getArticleTagById = async (req, res) => {
  try {
    const article_tag = await ArticleTag.findByPk(req.params.id, {
      attributes: {
        exclude: ["article_id", "tag_id"],
      },
      include: [
        {
          model: Article,
          as: "article",
          attributes: { exclude: ["article_tag"] },
          include: [{ model: User, as: "author" }],
        },
        {
          model: Tag,
          as: "tag",
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
    const { article_id, tag_id } = req.body;
    const article = await Article.findByPk(article_id);

    if (!article) {
      return res.status(404).json({ msg: "Artículo no encontrado." });
    }
    if (article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permiso para modificar este artículo." });
    }

    const newRelation = await ArticleTag.create({ article_id, tag_id });
    res.status(201).json(newRelation);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const updateArticleTag = async (req, res) => {
  try {
    const [update] = await ArticleTag.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const article_tag = await ArticleTag.findByPk(req.params.id, {
        attributes: {
          exclude: ["article_id", "tag_id"],
        },
        include: [
          {
            model: Article,
            as: "article",
            attributes: { exclude: ["article_tag"] },
            include: [{ model: User, as: "author" }],
          },
          {
            model: Tag,
            as: "tag",
          },
        ],
      });
      return res.status(201).json({
        message: "The relationship has been updated successfully.",
        article_tag: article_tag,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const article_tag = await ArticleTag.findByPk(req.params.id, {
      include: [
        {
          model: Article,
          as: "article",
          attributes: { exclude: ["article_tag"] },
          include: [{ model: User, as: "author" }],
        },
        {
          model: Tag,
          as: "tag",
        },
      ],
    });
    if (!article_tag) {
      return res.status(404).json({
        mesagge: "Relationship not found",
      });
    }
    if (ArticleTag.article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "No tienes permiso para modificar este artículo." });
    }
    await ArticleTag.destroy();
    return res.status(200).json({
      message: "Relación eliminada exitosamente.",
      deletedRelationship: ArticleTag,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};
