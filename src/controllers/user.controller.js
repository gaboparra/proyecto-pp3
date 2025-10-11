import User from "../models/User.js";
import logger from "../config/logger.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
        payload: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Perfil obtenido correctamente",
      payload: { user },
    });
  } catch (error) {
    logger.error(`Error getting profile: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "Error al obtener perfil",
      payload: { error: error.message },
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      status: "success",
      payload: users,
    });
  } catch (err) {
    logger.error(`Error fetching users: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error fetching users",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      payload: user,
    });
  } catch (err) {
    logger.error(`Error fetching user: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error fetching user",
      error: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, country } = req.body;

    if (username !== undefined && username.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Username cannot be empty",
      });
    }

    if (country !== undefined && country.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Country cannot be empty",
      });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (username) user.username = username;
    if (country) user.country = country;
    // if (email) user.email = email;
    // if (password) user.password = password;

    await user.save();

    res.json({
      status: "success",
      message: "User updated successfully",
      payload: user,
    });
  } catch (err) {
    logger.error(`Error updating user: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error updating user",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      message: "User deleted",
      payload: deleted,
    });
  } catch (err) {
    logger.error(`Error deleting user: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error deleting user",
      error: err.message,
    });
  }
};
