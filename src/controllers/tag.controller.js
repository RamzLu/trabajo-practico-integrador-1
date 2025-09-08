import { ArticleTag } from "../models/articleTag.model.js";
import { Tag } from "../models/tag.model.js";

export const getAllTag = async (req, res) => {
  try {
    const tag = await Tag.findAll(req.body);
    return res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: ArticleTag,
          as: "article",
        },
      ],
    });
    if (tag) {
      return res.status(200).json(tag);
    } else {
      return res.status(404).json({
        message: "The tag could not be found or does not exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    if (tag) {
      return res.status(201).json(tag);
    } else {
      return res.status(400).json({
        message: "tag could not be created.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const [update] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const tag = await Tag.findByPk(req.params.id);
      return res.status(200).json({
        mesagge: "The tag has been updated successfully.",
        tag: tag,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({
        mesagge: "tag not found",
      });
    }
    await Tag.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "tag deleted successfully.",
      tag: tag,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};
