import jwt from "jsonwebtoken";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    biography,
    avatar_url,
    birth_date,
    role,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await Profile.create({
      first_name: first_name,
      last_name: last_name,
      biography: biography,
      avatar_url: avatar_url,
      birth_date: birth_date,
      user_id: user.id,
    });

    res.status(201).json({
      msg: "usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      msg: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coinciden",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "El usuario o la contraseña no coincide",
      });
    }

    const token = generateToken(user);

    // Enviar token como cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Logueado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      msg: "Error interno del servidor",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token"); // elimina cookie del navegador
  return res.json({ message: "Logout existoso" });
};

export const profile = async (req, res) => {
  const user = req.user;
  try {
    res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      msg: "Error interno del servidor",
    });
  }
};

export const updateProfileAuthenticate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const profile = await Profile.findOne({ where: { user_id: user_id } });
    if (!profile) {
      return res.status(404).json({
        msg: "Perfil no encontrado",
      });
    }
    await Profile.update(req.body);
    return res.status(201).json({
      message: "Profile updated",
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      msg: "Error interno del servidor",
    });
  }
};
