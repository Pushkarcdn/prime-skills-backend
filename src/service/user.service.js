import userRepository from "../repository/user.repository.js";
import { hashPassword } from "../lib/bcrypt.js";

const createUser = async (userData) => {
  userData.password = await hashPassword(userData.password);

  const user = await userRepository.createUser(userData);
  return user;
};

const findUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  return user;
};

const findUserByUsername = async (username) => {
  const user = await userRepository.findUserByUsername(username);
  return user;
};

const findUserByEmail = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  return user;
};

const findUserByFieldName = async (conditions) => {
  const user = await userRepository.findUserByFieldName(conditions);
  return user;
};

const updateUserById = async (id, updateData) => {
  const user = await userRepository.updateUserById(id, updateData);
  return user;
};

const deleteUserById = async (id) => {
  const user = await userRepository.deleteUserById(id);
  return user;
};

export default {
  createUser,
  findUserById,
  findUserByUsername,
  findUserByEmail,
  findUserByFieldName,
  updateUserById,
  deleteUserById,
};
