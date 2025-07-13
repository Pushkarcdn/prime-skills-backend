import models from "../../models/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { NotFoundException } from "../../exceptions/index.js";

export default (router) => {
  const collections = Object.keys(models);

  collections.forEach((collection) => {
    const dashedCollectionNames = collection
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    router.delete(`/${dashedCollectionNames}/:id`, async (req, res, next) => {
      try {
        const model = models?.[collection];

        if (!model) {
          throw new NotFoundException(
            `Collection ${dashedCollectionNames} not found!`,
            dashedCollectionNames,
          );
        }

        const id = req.params.id;

        const data = await model.findById(id);

        if (!data) {
          throw new NotFoundException(
            `Item not found!`,
            dashedCollectionNames,
            id,
          );
        }

        await model.findByIdAndDelete(id);

        return successResponse(
          res,
          data,
          `${collection} deleted successfully!`,
          id,
        );
      } catch (error) {
        next(error);
      }
    });
  });
};
