import models from "../../models/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { NotFoundException } from "../../exceptions/index.js";

export default (router) => {
  const collections = Object.keys(models);

  collections.forEach((collection) => {
    const dashedCollectionNames = collection
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    router.get(`/${dashedCollectionNames}`, async (req, res, next) => {
      try {
        const model = models?.[collection];

        if (!model) {
          throw new NotFoundException(
            `Collection ${dashedCollectionNames} not found!`,
            dashedCollectionNames,
          );
        }

        const data = await model.find();

        return successResponse(
          res,
          data,
          `${collection} fetched successfully!`,
          collection,
        );
      } catch (error) {
        next(error);
      }
    });

    router.get(`/${dashedCollectionNames}/:id`, async (req, res, next) => {
      try {
        const model = models?.[collection];

        if (!model) {
          throw new NotFoundException(
            `Collection ${dashedCollectionNames} not found!`,
            dashedCollectionNames,
          );
        }

        const data = await model.findById(req.params.id);

        if (!data) {
          throw new NotFoundException(
            `Item not found!`,
            dashedCollectionNames,
            req.params.id,
          );
        }

        return successResponse(
          res,
          data,
          `${collection} fetched successfully!`,
          collection,
        );
      } catch (error) {
        next(error);
      }
    });
  });
};
