import { registerUser } from "../controllers/auth/auth.controller.js";

export default (router) => {
  router.post("/auth/register", registerUser);
};
