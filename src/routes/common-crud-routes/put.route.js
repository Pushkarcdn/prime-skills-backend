import models from "../../models/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { NotFoundException } from "../../exceptions/index.js";

export default (router) => {
  const collections = Object.keys(models);

  collections.forEach((collection) => {
    const dashedCollectionNames = collection
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    router.put(`/${dashedCollectionNames}/:id`, async (req, res, next) => {
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

        const payload = { ...req.body, ip: req.ip };

        await model.findByIdAndUpdate(id, payload);

        return successResponse(
          res,
          data,
          `${collection} updated successfully!`,
          id,
        );
      } catch (error) {
        next(error);
      }
    });
  });
};
