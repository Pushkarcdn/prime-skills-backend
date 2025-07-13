import models from "../../models/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { NotFoundException } from "../../exceptions/index.js";

export default (router) => {
  const collections = Object.keys(models);

  collections.forEach((collection) => {
    const dashedCollectionNames = collection
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    router.post(`/${dashedCollectionNames}`, async (req, res, next) => {
      try {
        const model = models?.[collection];

        if (!model) {
          throw new NotFoundException(
            `Collection ${dashedCollectionNames} not found!`,
            dashedCollectionNames,
          );
        }

        const payload = { ...req.body, ip: req.ip };

        const data = await model.create(payload);

        return successResponse(
          res,
          data,
          `${collection} created successfully!`,
          collection,
        );
      } catch (error) {
        next(error);
      }
    });
  });
};
