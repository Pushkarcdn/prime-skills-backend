import userRepository from "../repository/user.repository.js";
import successResponse from "../utils/responses/successResponse.js";

export const getProfessionals = async (req, res, next) => {
  try {
    const professionals = await userRepository.getProfessionals();
    return successResponse(
      res,
      professionals,
      "Professionals fetched successfully!",
      "Professionals",
    );
  } catch (error) {
    next(error);
  }
};

export const getProfessionalsByQuery = async (req, res, next) => {
  try {
    const { query } = req.query;
    const professionals = await userRepository.getProfessionalsByQuery(query);
    return successResponse(
      res,
      professionals,
      "Professionals fetched successfully!",
      "ProfessionalsBySearch",
    );
  } catch (error) {
    next(error);
  }
};
