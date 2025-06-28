import bcrypt from "bcrypt";
import Users from "../../models/users.model.js";

const register = async (req, res, next) => {
  try {
    const payload = req.body;

    payload.password = await bcrypt.hash(payload.password, 12);

    const user = new Users(payload);

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const login = (req, res, next) => {};

export { register, login };
