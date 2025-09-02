import { Profile } from "../models/profile.model.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profile = await Profile.findAll(req.body);
    return res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      return res.status(200).json(profile);
    } else {
      return res.status(404).json({
        message: "The profile could not be found or does not exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    if (profile) {
      return res.status(201).json(profile);
    } else {
      return res.status(400).json({
        message: "Profile could not be created.",
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const [update] = await Profile.update(req.body, {
      where: { id: req.params.id },
    });
    if (update) {
      const profile = await Profile.findByPk(req.params.id);
      return res.status(200).json({
        mesagge: "The profile has been updated successfully.",
        profile: profile,
      });
    }
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};

export const deleteprofile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({
        mesagge: "Profile not found",
      });
    }
    await Profile.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      mesagge: "Profile deleted successfully.",
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({
      mesagge: "Entered the try catch.",
      error: error.message,
    });
  }
};
