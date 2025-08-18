import Users from "../models/users.model.js";

const createUser = async (userData) => {
  const user = new Users(userData);
  await user.save();
  return user;
};

const findUserById = async (id) => {
  return await Users.findById(id);
};

const findUserByEmail = async (email) => {
  return await Users.findOne({ email });
};

const findUserByUsername = async (username) => {
  return await Users.findOne({ username });
};

const findUserByFieldName = async (conditions) => {
  return await Users.find(conditions);
};

const updateUserById = async (id, updateData) => {
  return await Users.findByIdAndUpdate(id, updateData, { new: false });
};

const deleteUserById = async (id) => {
  return await Users.findByIdAndDelete(id);
};

const getProfessionals = async () => {
  return await Users.find({ role: "jobSeeker" });
};

const getProfessionalsByQuery = async (query) => {
  return await Users.find({
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
      {
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: query,
            options: "i",
          },
        },
      },
    ],
  });
};

export default {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  findUserByFieldName,
  updateUserById,
  deleteUserById,
  getProfessionals,
  getProfessionalsByQuery,
};
