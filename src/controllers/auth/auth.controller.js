import userService from "../../service/user.service.js";
import successResponse from "../../utils/responses/successResponse.js";

const registerUser = async (req, res, next) => {
  try {
    const payload = req.body;

    await userService.createUser(payload);

    return successResponse(
      res,
      {},
      "User registered successfully!",
      "User registration",
    );
  } catch (error) {
    next(error);
  }
};

export { registerUser };
