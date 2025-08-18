import { getProfessionalsByQuery } from "../controllers/professionals.controller.js";

export default (router) => {
  router.route("/professionals").get(getProfessionalsByQuery);
};
