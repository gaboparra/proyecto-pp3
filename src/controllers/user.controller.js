import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, country } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (country) user.country = country;
    // if (email) user.email = email;
    // if (password) user.password = password;

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};
