import models from "../../models/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { NotFoundException } from "../../exceptions/index.js";
import { isValidObjectId } from "mongoose";

export default (router) => {
  const collections = Object.keys(models);

  collections.forEach((collection) => {
    const dashedCollectionNames = collection
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    router.put(
      `/${dashedCollectionNames}/:identifier`,
      async (req, res, next) => {
        try {
          const model = models?.[collection];

          if (!model) {
            throw new NotFoundException(
              `Collection ${dashedCollectionNames} not found!`,
              dashedCollectionNames,
            );
          }

          const identifier = req.params.identifier;

          let data;

          if (isValidObjectId(identifier)) {
            data = await model.findById(identifier);
          } else {
            data = await model.findOne({ slug: identifier });
          }

          if (!data) {
            throw new NotFoundException(
              `Item not found!`,
              dashedCollectionNames,
              identifier,
            );
          }

          const payload = { ...req.body, ip: req.ip };

          if (isValidObjectId(identifier)) {
            await model.findByIdAndUpdate(identifier, payload);
          } else {
            await model.findOneAndUpdate({ slug: identifier }, payload);
          }

          return successResponse(
            res,
            data,
            `${collection} updated successfully!`,
            identifier,
          );
        } catch (error) {
          next(error);
        }
      },
    );
  });
};
