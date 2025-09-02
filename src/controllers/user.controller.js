import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll(req.body);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.mesagge,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({
        message: "The user could not be found or does not exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.mesagge,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      return res.status(201).json(user);
    } else {
      return res.status(400).json({
        message: "User could not be created.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const [update] = await User.update(req.body, {
      where: { id: id },
    });
    if (update) {
      const user = await User.findByPk(id);
      return res.status(200).json({
        mesagge: "The user has been updated successfully.",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.mesagge,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        mesagge: "User not found",
      });
    }
    await User.destroy({ where: { id: id } });
    return res.status(200).json({
      mesagge: "User deleted successfully.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.mesagge,
    });
  }
};
