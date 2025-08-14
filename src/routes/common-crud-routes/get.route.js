import models from "../../models/index.js";
import successResponse from "../../utils/responses/successResponse.js";
import { NotFoundException } from "../../exceptions/index.js";
import { sanitizePayload } from "../../utils/filters/payloadFilter.js";
import { isValidObjectId } from "mongoose";

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

        // Get all schema paths that reference other models
        const schema = model.schema;
        const populateFields = [];

        schema.eachPath((pathname, schematype) => {
          if (schematype.options && schematype.options.ref) {
            populateFields.push(pathname);
          }
          // Handle arrays of references
          if (schematype.schema && schematype.schema.paths) {
            Object.keys(schematype.schema.paths).forEach((subPath) => {
              const subSchemaType = schematype.schema.paths[subPath];
              if (subSchemaType.options && subSchemaType.options.ref) {
                populateFields.push(`${pathname}.${subPath}`);
              }
            });
          }
        });

        let query = model.find();

        // Populate all reference fields
        populateFields.forEach((field) => {
          query = query.populate(field);
        });

        let data = await query.lean();

        data = await sanitizePayload(data, ["password", "__v"]);

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

    router.get(
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

          let data;

          // if identifier is a valid ObjectId
          if (isValidObjectId(req.params.identifier)) {
            data = await model.findOne({ _id: req.params.identifier });
          } else {
            data = await model.findOne({ slug: req.params.identifier });
          }

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
      },
    );
  });
};
