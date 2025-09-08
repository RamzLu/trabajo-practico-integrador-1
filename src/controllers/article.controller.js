import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";

export const getAllArticle = async (req, res) => {
  try {
    const article = await Article.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    });
    return res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const ArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    });
    if (article) {
      return res.status(200).json(article);
    } else {
      return res.status(404).json({
        message: "The article could not be found or does not exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const createArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    const article = await Article.findByPk(newArticle.id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    });
    if (article) {
      return res.status(201).json(article);
    } else {
      return res.status(400).json({
        message: "article could not be created.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const [update] = await Article.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const article = await Article.findByPk(req.params.id, {
        attributes: {
          exclude: ["user_id"],
        },
        include: [
          {
            model: User,
            as: "author",
          },
        ],
      });
      return res.status(200).json({
        mesagge: "The article has been updated successfully.",
        article: article,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    });
    if (!article) {
      return res.status(404).json({
        mesagge: "article not found",
      });
    }
    await Article.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "article deleted successfully.",
      article: article,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const getArticlesByUser = async (req, res) => {
  try {
    const user_id = req.user.id;

    const articles = await Article.findAll({
      where: { user_id: user_id },
      include: [
        {
          model: User,
          as: "author",
          include: [{ model: Profile, as: "profile" }],
        },
      ],
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const getArticleByIdForUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const article_id = req.params.id;

    const article = await Article.findOne({
      where: { id: article_id, user_id: user_id },
    });
    if (!article) {
      return res
        .status(404)
        .json({ msg: "Artículo no encontrado o no te pertenece." });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};
